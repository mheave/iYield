module.exports = function(authToken){

    return function(req, res, next) {
        if(authToken != "cwc"){
            let unauthMsg = {
                error: "you are not permitted to use this api"
            }
            return res.json(unauthMsg);
        }
        next();       
      }
}