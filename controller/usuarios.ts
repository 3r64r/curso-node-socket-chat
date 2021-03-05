import {Request, Response} from 'express';
import Usuario from '../models/usuario';

export const getUsuarios = async(req: Request, res : Response) => {

    const usuarios = await Usuario.findAll();

    res.json({usuarios});
}


export const getUsuario = async(req: Request, res : Response) => {

    const {id} = req.params;

    const usuario = await Usuario.findByPk(id);

    if(!usuario) {
        res.status(400).json({msg: 'No hay usuario con el id', id});
    }
    else {
        res.json({
            id,
            usuario
        })
    }
}

export const postUsuario = async(req: Request, res : Response) => {

    const {body} = req;

    try {

        const existeEmail = await Usuario.findOne({
            where: {
                email : body.email
            }
        });

        if(existeEmail) {
            res.status(400).json({
                msg: 'El correo ya fue registrado '+ body.email
            })
        }

        const usuario = new Usuario(body);
        await usuario.save();

        res.json({
            usuario
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

export const putUsuario = async(req: Request, res : Response) => {

    const {id} = req.params;
    const {body} = req;

    try {

        const usuario = await Usuario.findByPk(id);

        if(!usuario) {
            res.status(404).json({
                msg: 'No existe usuario con el id: '+ id
            }) 
        }
        else {
            await usuario.update(body);
            res.json(usuario)
        }

        // const existeEmail = await Usuario.findOne({
        //     where: {
        //         email : body.email
        //     }
        // });

        // if(existeEmail) {
        //     res.status(400).json({
        //         msg: 'El correo ya fue registrado '+ body.email
        //     })
        // }

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

    res.json({
        msg: 'putUsiario',
        body
    })
}

export const deleteUsuario = async(req: Request, res : Response) => {

    const {id} = req.params;

    const usuario = await Usuario.findByPk(id);

    if(!usuario) {
        res.status(404).json({
            msg: 'No existe usuario con el id: '+ id
        }) 
    }
    else {

        await usuario.update({estado: 0});
        // await usuario.destroy();

        res.json({
            usuario
        })
    }
}


