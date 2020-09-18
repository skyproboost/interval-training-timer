const responseTemplates = require('../helpers/response_templates')

module.exports = (res, statusCode, extraData = {}) => {
    let template = responseTemplates[statusCode] ? responseTemplates[statusCode] : {}
    template = { ...template, ...extraData }

    return res.status(statusCode).json({
        status: statusCode,
        message: template ? template.message : null,
        error: template ? template.error : null,
        code: template ? template.code : 0,
        data: template ? template.data : null
    })
}
