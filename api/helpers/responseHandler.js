const { template } = require('../helpers/response_template')

module.exports = {
    response: (res, status, extraData = {}) => {
        status = template[status] ? status : 200
        const response = {
            message: extraData.message ? extraData.message : template[status].message,
            error: extraData.error ? extraData.error : null,
            payload: extraData.payload ? extraData.payload : null,
            status,
            ...extraData
        }

        return res.status(status).json({ ...response })
    }
}
