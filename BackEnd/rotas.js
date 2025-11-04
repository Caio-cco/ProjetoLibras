import AdminController from './controller/AdminController.js'
import loginController from './controller/loginController.js'
import cursosController from './controller/cursosController.js'
import usuarioController from './controller/usuarioController.js'
import express from 'express';

export function adicionarRotas(api) {
    api.use(AdminController)
    api.use(loginController)
    api.use(cursosController)
    api.use(usuarioController)

    api.use('/public/storage', express.static('public/storage'))
}