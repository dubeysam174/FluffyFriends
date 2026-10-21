import express from 'express'
import multer from 'multer'

import {createVetProfile,
        getMyVetProfile,
        updateVetProfile,
        getNearbyVets,
        getVetById,
        getAllVets,
        searchVets
} from '../controllers/vet.controller.js'

import {protect,vetOnly,petOwnerOnly} from '../middleware/auth.middleware.js'


// multer part this is ....
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }
})

const router = express.Router()

// public routes...
router.get('/', protect, getAllVets)
router.get('/nearby', protect, getNearbyVets)

router.post('/create-profile', protect, vetOnly, createVetProfile)

router.get('/my-profile', protect, vetOnly, getMyVetProfile)
router.put('/update-profile', protect, vetOnly, upload.array('clinicPhotos', 5), updateVetProfile)
router.get("/search",protect,petOwnerOnly, searchVets);
// dynamic routes should be last ...
router.get('/:id', protect, getVetById)
export default router