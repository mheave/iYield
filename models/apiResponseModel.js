function apiResponseModel(resultObject){
    if(resultObject.errMsg){
        return {
            result:null,
            error: resultObject
        };
    }

    return {
        result: resultObject,
        error: null
    };
}


module.exports = apiResponseModel;
