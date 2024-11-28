import jwt from 'jsonwebtoken';


const createToke = (userInfo) => {
    return jwt.sign(userInfo,'secret_key',{expiresIn:'1h'})
}



const verifYtoken = (req,res,next) => {
    
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(401).json({message:"Token no proporcionado"})
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token,'secret_key',(err,decoded)=>{
        if (err){
            return res.status(403).json({message:"Fallo al autenticar"})
        }
        req.user = decoded
        next()
    })
}

export {
    createToke,
    verifYtoken
}
