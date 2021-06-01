/*
    Rutas de Eventos / Events
    host + /api/events
*/



const { Router } = require("express");
const { check } = require('express-validator');
const { getEventos, createEvento, updateEvento, deleteEvento } = require("../controllers/eventsController");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

const router = Router();


//Todas las rutas tienen que pasar por la validacion del JWT 
router.use(validarJWT); //eso signif que cualquier peticion debajo de esto va a tener que tener su token


//Obtener eventos 
router.get(
    '/',
    getEventos
);



//Crear un nuevo evento 
router.post(
    '/',
    [//middlewares
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('startDate', 'La fecha de inicio debe ser obligatoria').custom(isDate),
        check('endDate', 'La fecha de finalizacion debe ser obligatoria').custom(isDate),
        validarCampos
    ],
    createEvento
);



//Actualizar evento 
router.put(
    '/:id',
    [//middlewares


    ],
    updateEvento
);



//Borrar evento 
router.delete(
    '/:id',
    deleteEvento
);





module.exports = router;