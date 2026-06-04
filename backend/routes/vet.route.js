import express from 'express'

import {createVetProfile,
        getMyVetProfile,
        updateVetProfile,
        getNearbyVets,
        getVetById,
        getAllVets,
} from '../controllers/vet.controller.js'

import {protect,vetOnly,petOwnerOnly} from '../middleware/auth.middleware.js'


// making instance of router...
const router=express.Router()

//public routes...
router.get('/',protect,getAllVets)
router.get('/nearby',protect,getNearbyVets)
router.get('/:id',protect,getVetById)

//vet only routes...
router.post('/create-profile', protect,vetOnly,createVetProfile)
router.get('/my-profile', protect,vetOnly,getMyVetProfile)
router.put('/update-profile', protect,vetOnly,updateVetProfile)

export default router
