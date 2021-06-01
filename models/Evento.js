const { Schema, model } = require('mongoose');

const EventSchema = Schema({

    title: {

        type: String,
        required: true,

    },

    notes: {

        type: String,

    },

    startDate: {

        type: Date,
        required: true,

    },

    endDate: {

        type: Date,
        required: true,

    },

    user: {

        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    }

});



EventSchema.method('toJSON', function () {

    const { __v, _id, ...object } = this.toObject(); //extraigo las props que no me interesan

    object.id = _id; //esto es para cambiarle el nombre en el JSON en vez de _id le pongo id solo

    return object;


})



module.exports = model('Event', EventSchema);