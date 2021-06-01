const jwt = require('jsonwebtoken');



const generarJWT = (uid, name) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid,
            name
        };

        //hago la firma del token 
        //process.env.SECRET_JWT_SEED -> palabra secreta para firmar tokens
        //callback que si no se pudo generar el token imprime el error en consola sino devuelve el token
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h' //cuanto tiempo dura el token
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve(token);

        })

    })

}



module.exports = {

    generarJWT
}