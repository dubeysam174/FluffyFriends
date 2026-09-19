import express from 'express'

import {addPet,getMyPets,getPetById,updatePet,deletePet,addVaccination,addMedicalHistory} from '../controllers/pet.controller.js'

import {protect,petOwnerOnly} from '../middleware/auth.middleware.js'
import multer from 'multer';

const upload = multer({
    dest: 'uploads/',
    limits:{fileSize: 5*1024*1024}
})
const router = express.Router()


// all routes protected + petOwner only...

// ── Specific routes first
router.post('/add', protect, petOwnerOnly, upload.single('photo'), addPet)  // ✅ ADDED uploadrouter.get('/my-pets',   protect, petOwnerOnly, getMyPets)

// ── Routes with extra path segments (more specific than plain :id) 
router.post('/:id/vaccination',     protect, petOwnerOnly, addVaccination)
router.post('/:id/medical-history', protect, petOwnerOnly, addMedicalHistory)

// ── Plain dynamic routes last 
router.get('/:id',     protect, petOwnerOnly, getPetById)
router.put('/:id',     protect, petOwnerOnly, updatePet)
router.delete('/:id',  protect, petOwnerOnly, deletePet)

export default router



       