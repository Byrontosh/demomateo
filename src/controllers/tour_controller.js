import tourModel from '../models/tour.js'
import { v2 as cloudinary } from 'cloudinary'

import fs from 'fs-extra';


import { v4 as uuidv4 } from 'uuid';


const getAlltourController = async(req,res) => {
    try {
        
        const tours = await tourModel.getAllToursModel()
        res.status(200).json(tours)

    } catch (error) {
        console.log(error);
    }
}


const getAlltourControllerByID = async (req, res) => {
    const {id} = req.params
    try {
        const tour = await tourModel.getTourByIdModel(id)
        const status = tour.error ? 404 : 200
        res.status(status).json(tour)
    } catch (error) {
        res.status(500).json(error)
    }
}


const createTourController = async (req,res) => {
    
    const newTourData={
        id:uuidv4(),
        ...req.body
    }

    // req.body    req.params    req.query    req.headers     req.files
    
    try {
        
        const cloudinaryResponse = await cloudinary.uploader.upload(req.files.imagen.tempFilePath,{folder:'tours'})
        newTourData.imagen = cloudinaryResponse.secure_url
        newTourData.public_id = cloudinaryResponse.public_id
        const tour = await tourModel.createTourModel(newTourData)
        await fs.unlink(req.files.imagen.tempFilePath)
        res.status(201).json(tour.message)
    } catch (error) {
        res.status(500).json(error.message)
    }
}


const updatedTourController = async (req,res) => {
    const {id} = req.params
    try {
        
        console.log(id);
        console.log(req.body);
        
        
        const tour = await tourModel.updateTourModel(id,req.body)
        res.status(200).json(tour)
    } catch (error) {
        res.status(500).json(error)
    }
}



const deleteTourController = async(req,res) => {
    const {id} = req.params
    try {

        // Obtener el Tour por ID
        const tourFind = await tourModel.getTourByIdModel(id)
        // Eliminación por su public_id de cloudinary
        await cloudinary.uploader.destroy(tourFind.public_id)


        await tourModel.deleteTourModel(id)
        res.status(200).json({msg:"Tour eliminado correctamente"})
    } catch (error) {
        res.status(500).json(error)
    }
}


export {
    getAlltourController,
    getAlltourControllerByID,
    createTourController,
    updatedTourController,
    deleteTourController
}