const mongoose = require("mongoose");
const { Schema } = mongoose;

const choreSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    shift: {
        required: true,
        type: String
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "people",
        default: null
    },
    completedBy: Array,
})

const ChoreModel = mongoose.model("chores", choreSchema);

module.exports = ChoreModel;