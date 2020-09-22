module.exports = {
    500: {
        status: 500,
        message: 'Internal Server Error (Внутренняя ошибка сервера)'
    },
    401: {
        status: 403,
        message: 'Unauthorized (Неавторизованный)'
    },
    403: {
        status: 403,
        message: 'Forbidden (Доступ запрещен)'
    },
    422: {
        status: 422,
        message: 'Unprocessable Entity (Необработанная сущность)'
    },
    200: {
        status: 200,
        message: 'Success (Успешно)'
    }
}
