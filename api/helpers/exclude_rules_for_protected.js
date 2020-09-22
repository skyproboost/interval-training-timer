const allowMethods = ['POST', 'PUT', 'DELETE', 'PATCH']
const excludeRoutes = [
    '/',
    '/_loading/sse',
    '/login',
    '/register'
]

module.exports = {
    allowMethods,
    excludeRoutes
}
