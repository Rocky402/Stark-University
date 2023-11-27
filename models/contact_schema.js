var mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({

    cname: {
        type: String,
        required: true
    },

    cemail: {
        type: String,
        required: true
    },

    ctext: {
        type: String,
        required: false
    }
})

const contacts = new mongoose.model("contact", contactSchema);

module.exports = contacts;
