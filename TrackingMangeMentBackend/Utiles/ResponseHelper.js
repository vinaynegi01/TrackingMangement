module.exports = {
    SetSuccessResponse: function(data, res, statusCode) {
        let response = {
          success: true,
            data: data,
            error: null,
            status: statusCode
        }
        this.SetResponse(statusCode, response, res)
    },
    SetSuccessErrorResponse: function(data, res, statusCode){
        let response = {
            success: false,
            data: [],
            error: data,
            status: statusCode
        }
        this.SetResponse(statusCode, response, res)
    },
    SetResponse: function(status, response, res) {
        res.status(status).json(response)
        res.end()
    }
}