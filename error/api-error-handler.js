const APIError = require("./apierror");

function apiErrorHandler(err, req, res, next) {
    console.log(err);

    if (err instanceof APIError) {
        res.status(err.code).json(err.msg);
        return;
    }

    res.status(500).json('something went wrong')
    next();
}

module.exports = apiErrorHandler;