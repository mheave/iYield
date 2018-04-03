function errorModel(method, params, errMsg, stackTrace){
    return {
        method: method,
        params: params,
        errMsg: errMsg,
        stackTrace: stackTrace
    };
}

module.exports = errorModel;