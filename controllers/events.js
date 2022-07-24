const Evento = require("../models/Evento")


const getEventos = async (req, res) => {

    try {
        const eventos = await Evento.find().populate('user', 'name email');

        res.status(200).json({
            ok: true,
            eventos
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error al traer los datos'
        })
    }

}

const crearEvento = async (req, res) => {

    const evento = new Evento(req.body)

    try {

        evento.user = req.uid;

        const eventoGuardado = await evento.save()

        res.json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarEvento = async (req, res) => {

    const eventoId = req.params.id;
    const { uid } = req

    try {
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el evento'
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene acceso para editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true })

        return res.status(200).json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el evento'
        })
    }
}

const eliminarEvento = async (req, res) => {

    const eventoId = req.params.id;
    const { uid } = req

    try {
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el evento'
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene acceso para eliminar este evento'
            })
        }

        await Evento.findByIdAndDelete(eventoId)

        return res.status(200).json({
            ok: true,
            msg: 'Evento eliminado'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el evento'
        })
    }

}


module.exports = { getEventos, actualizarEvento, crearEvento, eliminarEvento }