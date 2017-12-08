function errorModel(route, msg, data){
    return {
        route: route,
        msg: msg,
        data: data
    };
}

module.exports = errorModel;