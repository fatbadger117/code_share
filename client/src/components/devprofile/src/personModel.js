const mongoose = require("mongoose");
const {Schema} = mongoose;

const personSchema = new Schema ({
    name:{
        required: true,
        type: String
    },
    shift:{
        required: true,
        type: String
    },
    assignedChores: Array
})

const PersonModel = mongoose.model("people", personSchema);

module.exports = PersonModel;