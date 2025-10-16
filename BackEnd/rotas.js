import cadastroController from './controller/cadastroController'
import loginController from './controller/loginController'
import cursosController from './controller/cursosController'

export function adicionarRotas(api) {
    api.use(cadastroController)
    api.use(loginController)
    api.use (cursosController)
}