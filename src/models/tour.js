
import dotenv from 'dotenv';

dotenv.config()


const tourModel = {
    
    async getAllToursModel(){
        try {
            const peticion = await fetch("https://666774e6a2f8516ff7a7882e.mockapi.io/tours/")
            const tours = await peticion.json()
            return tours
        } catch (error) {
            console.log(error);
        }
    }


    ,

    async getTourByIdModel(tourId) {
        const response = await fetch(`${process.env.URL_BDD_TOURS}/${tourId}`);
        if (!response.ok) {
            return {error:"Tour no encontrado"}
        }
        const data = await response.json()
        return data
    },

    async createTourModel(newTour){
        // 1.- CONEXION BDD
        const url = process.env.URL_BDD_TOURS
        // 2.- ENVIAR DATA A LA BDD
        const peticion = await fetch(url,{
            method:"POST",
            body:JSON.stringify(newTour),
            headers:{"Content-Type":"application/json"}
        })
        // 3.- OBTENER RESPUESTA A LA BDD
        const data = await peticion.json()
        // 4.- MANDAR RESPUESTA AL CONTROLADOR
        return data
    }


    ,


    async updateTourModel(tourId,updatedTour){

           // 1.- CONEXION BDD
        const url = `${process.env.URL_BDD_TOURS}/${tourId}`
        // 2.- ENVIAR DATA A LA BDD
        const peticion = await fetch(url,{
            method:"PUT",
            body:JSON.stringify(updatedTour),
            headers:{"Content-Type":"application/json"}
        })
        // 3.- OBTENER RESPUESTA A LA BDD
        const data = await peticion.json()
        // 4.- MANDAR RESPUESTA AL CONTROLADOR
        return data
    }

    ,




    async deleteTourModel(tourId){
        // 1.- CONEXION BDD
        const url = `${process.env.URL_BDD_TOURS}/${tourId}`
        // 2.- ENVIAR DATA A LA BDD
        const peticion = await fetch(url,{
            method:"DELETE"
        })
        // 3.- OBTENER RESPUESTA A LA BDD
        const data = await peticion.json()
        // 4.- MANDAR RESPUESTA AL CONTROLADOR
        return data
    }

    



}

export default tourModel