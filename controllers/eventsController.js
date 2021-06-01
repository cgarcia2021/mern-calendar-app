


const { response } = require('express');
const Evento = require('../models/Evento');



//GET
const getEventos = async (req, res = response) => {


    const eventos = await Evento
        .find()//para obtener los eventos
        .populate('user', 'name'); //para traer los datos del usuario / solo me quedo con el name




    try {
        res.status(200).json({
            ok: true,
            eventos: eventos
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}


//POST 
const createEvento = async (req, res = response) => {

    const evento = new Evento(req.body);

    console.log(evento)

    try {

        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.status(200).json({
            ok: true,
            evento: eventoGuardado
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}


//PUT 
const updateEvento = async (req, res = response) => {

    const eventoId = req.params.id;

    try {

        const evento = await Evento.findById(eventoId); //primero veo si existe el evento

        if (!evento) {

            return res.status(404).json({
                ok: false,
                msg: 'No existe evento con ese id'
            })
        }

        if (evento.user.toString() !== req.uid) {
            return res.status(401).jsonp({
                ok: false,
                msg: 'No tiene permisos para editar este evento'
            })
        }

        const nuevoEvento = { //el nuevo evento (el que voy a sobreescribir)

            ...req.body,
            user: req.uid

        }

        const eventoUpdated = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });
        //el new en true es para que retorne el evento con los datos actualizados pq por defecto
        //retorna el viejo objeto para compararlo con lo que guarda en la base de datos.


        res.status(200).json({
            ok: true,
            evento: eventoUpdated // si todo se hace bien, mando el evento actualizado 
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}


//DELETE
const deleteEvento = async (req, res = response) => {

    const eventoId = req.params.id;


    try {

        const evento = await Evento.findById(eventoId); //primero veo si existe el evento


        if (!evento) {

            res.status(404).json({
                ok: false,
                msg: 'No existe evento con ese id'
            })
        }

        if (evento.user.toString() !== req.uid) {
            return res.status(401).jsonp({
                ok: false,
                msg: 'No tiene permisos para eliminar este evento'
            })
        }


        await Evento.findByIdAndDelete(eventoId); //borro el evento


        res.status(200).json({
            ok: true,
            msg: 'Borrado con extito!'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }


}


module.exports = {

    getEventos,
    createEvento,
    updateEvento,
    deleteEvento
}




