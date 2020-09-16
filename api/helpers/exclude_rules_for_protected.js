const allowMethods = ['POST', 'PUT', 'DELETE', 'PATCH']
const excludeRoutes = [
    '/users/login',
    '/users/register'
]

module.exports = {
    allowMethods,
    excludeRoutes
}
