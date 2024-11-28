
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';

dotenv.config()


const userModel = {

    async registerUserModel(newUser){
        const url = process.env.URL_BDD_USERS
        const peticion = await fetch(url,{
            method:"POST",
            body:JSON.stringify(newUser),
            headers:{'Content-Type':'application/json'}
        })
        const data = await peticion.json()
        return data
    }


    ,

    async loginUserModel(username,password){
        const url = process.env.URL_BDD_USERS

        const response = await fetch(url)

        const users = await response.json()

        const user = users.find(user => user.username === username)
        if (!user){
            return {error:"Username o password erroneos"}
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        
        if (user && passwordMatch){
            return user
        }
        else{
            return {error:"Username o password erroneos "}
        }

    }
}

export default userModel