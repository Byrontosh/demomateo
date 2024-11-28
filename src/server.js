// Requerir módulos
import express from 'express'

import cloudinary from 'cloudinary';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';
import routerTour from './routers/tour_routes.js'
import routerUser from './routers/user_routes.js'




// INCIALIZACIONES
dotenv.config()

const app = express()

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
})


app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}))









// VARIABLES
app.set('port',process.env.port || 3000)


// MIDDLEWARES
app.use(express.json())




// RUTA PRINCIPAL
app.get('/',(req,res)=>{
    res.send("OK-mm")
})

// RUTAS PARA EL TOUR
app.use('/api',routerTour)

// RUTAS PARA EL USER
app.use('/api',routerUser)

// RUTAS PARA EL BOOKING



// Exportar la instancia de app
export default app

