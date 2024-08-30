const mongoose = require('mongoose');
const schema = mongoose.Schema;

const modelnotification = new schema({
    'date' : String,
    'title' : String,
    'command' : String,
    'photo':String,
})

module.exports = mongoose.model('adminnotification',modelnotification)