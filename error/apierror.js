class APIError {
    constructor(code, msg) {
        this.code = code;
        this.msg = msg;
    }

    static badRequest(msg) {
        return new APIError(400, msg);
    }

    static internal(msg) {
        return new APIError(500, msg);
    }


}

module.exports = APIError;
