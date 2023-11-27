var mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({

   sfname: {
    type: String,
    required: true
   },
   slname:{
    type: String,
    required: true
   },
   semail:{
    type: String,
    required: true
   },
   saddress:{
    type: String
   },
   scourse:{
    type: String,
    required: true
   },
   syear:{
    type : String,
    required: true
   },
   sfile:{
    type : String
   },
   inlineRadioOptions:{
    type : String
   }

    
})

const admissions = new mongoose.model("admission", admissionSchema);

module.exports = admissions;