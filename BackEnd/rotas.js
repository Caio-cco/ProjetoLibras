import cadastroController from './controller/cadastroController.js'
import loginController from './controller/loginController.js'
import cursosController from './controller/cursosController.js'

export function adicionarRotas(api) {
    api.use(cadastroController)
    api.use(loginController)
    api.use (cursosController)
}