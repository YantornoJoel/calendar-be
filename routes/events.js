const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate')
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require("../middlewares/validar-jwt");


//* Todas requieren pasar por validarJWT
router.use(validarJWT);


router.get('/', getEventos)

router.post('/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio obligatoria').custom(isDate),
        check('end', 'Fecha de finalización obligatoria').custom(isDate),

        validarCampos
    ],
    crearEvento
)

router.put('/:id',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio obligatoria').custom(isDate),
        check('end', 'Fecha de finalización obligatoria').custom(isDate),

        validarCampos
    ],
    actualizarEvento
)

router.delete('/:id', eliminarEvento)



module.exports = router;