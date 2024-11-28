import {Router} from 'express'
import { createTourController, deleteTourController, getAlltourController, getAlltourControllerByID, updatedTourController } from '../controllers/tour_controller.js'
import { verifYtoken } from '../middlewares/auth.js'
const router = Router()



// Pública - Todos los usuarios
router.get('/tours',getAlltourController)
router.get('/tours/:id',getAlltourControllerByID)


// Privada - Admin o Empleado
router.post('/tours', verifYtoken , createTourController)
router.put('/tours/:id',verifYtoken, updatedTourController)
router.delete('/tours/:id',verifYtoken, deleteTourController)





export default router