function errorModel(method, errMsg, params){
    return {
        method: method,
        errMsg: errMsg,
        params: params
    };
}

module.exports = errorModel;