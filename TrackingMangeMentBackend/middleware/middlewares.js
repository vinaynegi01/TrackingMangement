const CommonConfig = require('../Utiles/common-config')

module.exports ={
    RequestMethodsMiddlewares: {
        ApplicationJsonData: async (req, res, next) => {
            let contentType = req.get('Content-Type')
            if (!contentType || contentType.split(';')[0] !== CommonConfig.CONTENT_TYPE.JSON) {
                return next({
                    status: CommonConfig.STATUS_CODE.BAD_REQUEST,
                    message: CommonConfig.ERRORS.CONTENT_TYPE_JSON
                }, false)
            }
            req.content_type = contentType
            return next()
        },
        ApplicationFormData: async (req, res, next) => {
            let contentType = req.get('Content-Type')
            if (!contentType || contentType.split(';')[0] !== CommonConfig.CONTENT_TYPE.MULTIPART) {
                return next({
                    status: CommonConfig.STATUS_CODE.BAD_REQUEST,
                    message: CommonConfig.ERRORS.CONTENT_TYPE_MULTIPART
                }, false)
            }
            req.content_type = contentType
            return next()
        }
    }
}