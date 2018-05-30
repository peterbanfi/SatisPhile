const mongoose = require('mongoose');

const satisfactionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sleep: {
        type: Number,
        required: true,
    },
    food: {
        type: Number,
        required: true,
    },
    work: {
        type: Number,
        required: true,
    },
    fun: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});


module.exports = mongoose.model('Satisfaction', satisfactionSchema);