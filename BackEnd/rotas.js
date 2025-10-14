import cadastroController from './controller/cadastroController'
import loginController from './controller/loginController'

export function adicionarRotas(api) {
    api.use(cadastroController)
    api.use(loginController)
}