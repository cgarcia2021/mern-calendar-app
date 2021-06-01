//importo de nuevo para tener el autocompletado
//con el res = express.response me aseguro de tenerlo
const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generarJWT } = require('../helpers/jwt');


//POST
const userCreate = async (req, res = response) => {

    const { email, password } = req.body

    try {

        let usuario = await User.findOne({ email });

        if (usuario) {
            return res.status(400).json({

                ok: false,
                msg: 'Ya existe un usuario con ese email.'

            });
        }

        usuario = new User(req.body);

        //Encriptar password
        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync(password, salt);


        await usuario.save();

        //GENERAR JWT
        const token = await generarJWT(usuario.id, usuario.name);

        //solo se puede ejecutar 1 solo res.json
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token //devuelvo el token
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}

//POST
const userLogin = async (req, res = response) => {

    const { email, password } = req.body;


    try {

        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(400).json({

                ok: false,
                msg: 'El email no es correcto.' //cambiarlo a user o pass no son correctos

            });
        }

        //confirmar los password


        //comparo el password de la peticion con el password de la db (usuario.password)
        //devuelve true si es igual sino false
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta' //cambiarlo a user o pass no son correctos
            });

        }

        //GENERAR JWT
        const token = await generarJWT(usuario.id, usuario.name);


        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token //devuelvo el token
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }


}


//GET
const tokenRevalidate = async (req, res = response) => {

    const { uid, name } = req;



    //GENERO UN JWT 
    const token = await generarJWT(uid, name);


    res.json({
        ok: true,
        token,
        uid,
        name

    })
}



module.exports = {

    userCreate,
    userLogin,
    tokenRevalidate

}
