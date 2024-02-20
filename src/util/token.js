const jwt = require('jsonwebtoken');

const setToken = async(id, key) =>{
    if(id){
        return jwt.sign({id}, key, {expiresIn:28800});
    }
    return false;
}

const checkToken = async (token, id, key) =>{
    try{
        let decoded = await jwt.verify(token, key);
        if(decoded){
            if(decoded.id == id ) return true;
        }
        return false;
    }catch(e){
        return false;
    }
}

module.exports = {setToken, checkToken};