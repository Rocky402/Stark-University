var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

const addregisterSchema = new mongoose.Schema({
   fname: {
    type: String,
    required: true
   },
   lname:{
    type: String,
    required: true
   },
   email:{
    type: String,
    required: true
   },
   password:{
    type: String,
    required: true
   },
   confirm_password:{
    type: String,
    required: true
   }

})

addregisterSchema.pre("save", function(next) {
   if(!this.isModified("password")) {
      return next();
   }
   this.password = bcrypt.hashSync(this.password, 10);
   this.confirm_password = bcrypt.hashSync(this.confirm_password, 10);
   next();
});

addregisterSchema.methods.comparePassword = function (plaintext, callback) {
   return callback(null, bcrypt.compareSync(plaintext, this.password));
};

const addRegister = new mongoose.model("registration", addregisterSchema);

module.exports = addRegister;