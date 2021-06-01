/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { userCreate, userLogin, tokenRevalidate } = require('../controllers/authController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.post(
    '/register',
    [//middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El passwrod debe de ser de 6 caracteres como minimo').isLength({ min: 6 }),
        validarCampos

    ],
    userCreate)


router.post(
    '/',
    [//middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El passwrod debe de ser de 6 caracteres como minimo').isLength({ min: 6 }),
        validarCampos
    ],
    userLogin)

router.get('/renew', validarJWT, tokenRevalidate)




module.exports = router;
