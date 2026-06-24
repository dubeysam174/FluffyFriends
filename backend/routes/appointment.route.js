import express from 'express'
import { bookAppointment,getMyAppointments,getVetAppointments,getAppointmentById,confirmAppointment,rejectAppointment,cancelAppointments,completeAppointment } from '../controllers/appointment.controller.js'
import {protect,petOwnerOnly,vetOnly} from '../middleware/auth.middleware.js'



const router= express.Router()

// pet owner routes ...
router.post('/book',protect,petOwnerOnly,bookAppointment)
router.get('/my-appointments',protect,petOwnerOnly,getMyAppointments)
router.put('/:id/cancel',protect,petOwnerOnly,cancelAppointments)


// vet routes...
router.get('/vet-appointments',protect,vetOnly,getVetAppointments)
router.put('/:id/confirm',protect,vetOnly,confirmAppointment)
router.put('/:id/reject',protect,vetOnly,rejectAppointment)
router.put('/:id/complete',protect,vetOnly,completeAppointment)


// shared route (both petOwner and vet)...
router.get('/:id',protect,getAppointmentById)


export default router