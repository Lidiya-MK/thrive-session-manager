const mongoose = require('mongoose');

const traineeSchema = new mongoose.Schema(
    {
        name:{type: String, required: true},
        email:{type: String, required: true, unique: true},
        password:{type: String, required: true},
        goals:{type: String},
    },
    {timeStamps: true}
);

module.exports = mongoose.model('Trainee', traineeSchema);