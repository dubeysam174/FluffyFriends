import Vet from '../models/vet.model.js'
import User from '../models/user.model.js'
import {asyncHandler} from '../utils/asyncHandler.js'



// post /api/vets/create-profile....

// only vets can create profile...
export const createVetProfile= asyncHandler(async(req,res)=>{
    const {
        clinicName,
        phone,
        address,
        city,
        bio,
        specializations,
        experience,
        consultationFee,
        availableDays,
        availableSlots,
        coordinates

    }= req.body


    // applying check if profile already exists ...

    const existing= await Vet.findOne({user: req.user._id})
    if(existing) return res.status(400).json({
        success:false,
        message:'Vet profile already exists'
    })

    // create vet profile...
    const vet= await Vet.create({
        user: req.user._id,
        clinicName,
        phone,
        address,
        city,
        bio,
        specializations,
        experience,
        consultationFee,
        availableDays,
        availableSlots,
        location:{
            type: 'point',
            coordinates: coordinates || [0,0]
        }
    })
    res.status(201).json({
        success:true,
        message: 'Vet profile created successfully',
    })
})


// get /api/vets/my-profile...
// vet can see their own profile...
export const getMyVetProfile= asyncHandler(async(req,res)=>{
     const vet = await Vet.findOne({user: req.user._id}).populate('user','name email avatar')

     if(!vet) return res.status(404).json({
        success:false,
        message: 'vet profile not found'
     })

     res.json({success:true,vet})
})


// put /api/vets/update-profile...
// vet can update their profiles ...
export const updateVetProfile= asyncHandler(async(req,res)=>{
    const vet= await Vet.findOne({user:req.user._id})

    if(!vet) return res.status(404).json({
        success:false,
        message:'vet profile not found'
    })


    const fields =[
        'clinicName', 'phone', 'address', 'city', 'bio',
    'specializations', 'experience', 'consultationFee',
    'availableDays', 'availableSlots', 'isAvailable'
    ]


    // only update fields that were sent...
    fields.forEach(field=>{
        if(req.body[field] !== undefined){
            vet[field]= req.body[field]
        }
    })


    // update coordinates if sent...
    if(req.body.coordinates){
        vet.location= {
            type: 'Point',
            coordinates: req.body.coordinates
        }
    }

    await vet.save()

    res.json({
        success: true,
        message:'vet profile updated',
        vet
    })
})


// get /api/ vets/ nearby...
//pet owner searches nearby vets..
export const getNearbyVets = asyncHandler(async(req,res)=>{
    const {longitude,latitude,maxDistance=10000,species}=req.query
    // maxdistance in meters = default 10 km...

    if(!longitude || !latitude) return res.status(400).json({
        success:false,
        message:'longitude and latitude are required'
    })

    // build query...
    const query= {
         verificationStatus: 'approved',
    isAvailable:        true,
    location: {
      $near: {
        $geometry: {
          type:        'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        },
        $maxDistance: parseFloat(maxDistance)
      }
    }
    }

    //filter by species if provided...
    if(species){
        query.specializations=species
    }


    const vets = await Vet.find(query)
    .populate('user','name email avatar')
    .select('-availableSlots')


    res.json({
        success:true,
        count:vets.length,
        vets
    })
})


// get /api/ vets/:id..
// get single vet details...
export  const getVetById = asyncHandler(async(req,res)=>{
    const vet = await Vet.findById(req.params.id)
    .populate('user','name email avatar')

    if(!vet) return res.status(404).json({
        success:false,
        message: 'vet not found'
    })

    res.json({success:true,vet})

})


// get api/vets...
//get all approved vets (for brosing)...

export const getAllVets= asyncHandler(async(req,res)=>{
    const {city,species} = req.query
    const query= {verificationStatus:'approved'}

    if(city) query.city= {$regex:city,$options:'i'}
    if(species) query.specializations= species

    const vets = await Vet.find(query)
    .populate('user','name email avatar')
    .select('-availableSlots')

    res.json({
        success:true,
        count: vets.length,
        vets
    })
})