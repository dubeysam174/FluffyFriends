import express from 'express'

import {createVetProfile,
        getMyVetProfile,
        updateVetProfile,
        getNearbyVets,
        getVetById,
        getAllVets,
        searchVets
} from '../controllers/vet.controller.js'

import {protect,vetOnly,petOwnerOnly} from '../middleware/auth.middleware.js'

const router = express.Router()

// public routes...
router.get('/', protect, getAllVets)
router.get('/nearby', protect, getNearbyVets)

router.post('/create-profile', protect, vetOnly, createVetProfile)

router.get('/my-profile', protect, vetOnly, getMyVetProfile)
router.put('/update-profile', protect, vetOnly, updateVetProfile)
router.get("/search",protect,petOwnerOnly, searchVets);
// dynamic routes should be last ...
router.get('/:id', protect, getVetById)
export default router