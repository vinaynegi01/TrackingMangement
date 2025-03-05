const CommonConfig = module.exports

const ROLES = CommonConfig.ROLES = {
    COOK: 1, //  0001
    CUSTOMER: 2, //  0010
    ADMIN: 4, //  0100
    GUEST: 8, //  0011
    BLOCKED: 5 //  0011
}

CommonConfig.ACCESS_LEVELS = {
    ALL: ROLES.COOK | ROLES.CUSTOMER | ROLES.GUEST | ROLES.ADMIN, // 1111 = [15]
    AUTH: ROLES.COOK | ROLES.CUSTOMER | ROLES.ADMIN, // 0111 = [7]
    COOK: ROLES.COOK | ROLES.ADMIN, // 0101 = [5]
    CUSTOMER: ROLES.CUSTOMER | ROLES.ADMIN, // 0110 = [6]
    ADMIN: ROLES.ADMIN // 0100 = [4]
}

CommonConfig.STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
}

CommonConfig.WHITE_LIST = {
    IMAGE_EXTENSTIONS: ['.JPG', '.jpg', '.JPEG', '.jpeg', '.PNG', '.png']
}

CommonConfig.ERRORS = {
    INVALID_FILE_FORMAT: 'Invalid image file format. Please upload only .JPG, JPEG or .PNG only',
    CONTENT_TYPE_JSON: 'Invalid Content Type. Content-Type: applicatiotn/json required.',
    CONTENT_TYPE_MULTIPART: 'Invalid Content Type. Content-Type: multipart/form-data required.'
}

CommonConfig.PRODUCT_URL_PATH ={
    URL: 'uploads/image'
}
CommonConfig.FILES = {
    IMAGE:'image'
}
CommonConfig.CONTENT_TYPE = {
    JSON: 'application/json',
    MULTIPART: 'multipart/form-data'
}