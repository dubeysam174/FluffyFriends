import Pet from '../models/pet.model.js'
import User from '../models/user.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { uploadCloudinary,deleteFromCloudinary } from '../utils/cloudinary.js'



// post /api/pets/add....
export const addPet= asyncHandler(async(req,res)=>{
    const {name,species,breed,age,gender,weight,notes}= req.body

    if(!name || !species) return res.status(400).json({
        success:false,
        message:'Name and species are required'
    })

    let photo='';

    //here we will add the handle pic for pet ...
    if(req.file){
        try {
            console.log('uploading pet photo');
            const result=await uploadCloudinary(
                req.file.path,
                'fluffyFriends/pet-photos'
            );
            photo= result.url;
            console.log("pet photo uploaded",photo)

            // Delete temp file
        const fs = await import('fs').then(m => m.default);
        fs.unlinkSync(req.file.path);
        } catch (error) {
            console.error('photo upload error:',uploadError);
            throw new Error('failed to upload pet photo')
        }
    }

     // here we will create the document if everything is upto date...
     const pet= await Pet.create({
        owner: req.user._id,
        name,
        species,
        breed: breed || '',
        age: age || 0,
        gender: gender || 'Unknown',
        weight: weight || 0,
        photo, // added here ...
        notes: notes || ''

     })

     // add pet to user's pet array ...
     await User.findByIdAndUpdate(req.user._id,{
        $push : {pets: pet._id}
     })

     res.status(201).json({
        success: true,
        message: 'Pet added successfully',
        pet
     })

})



// get /api/pets/my-pets...
export const getMyPets = asyncHandler(async (req, res) => {
  try {
    console.log("🔍 User:", req.user);  // ← Debug
    console.log("🔍 User ID:", req.user?._id);  // ← Debug
    
    const pets = await Pet.find({
      owner: req.user._id,
      isActive: true,
    });

    console.log("✅ Pets found:", pets.length);  // ← Debug

    res.json({
      success: true,
      count: pets.length,
      pets,
    });
  } catch (error) {
    console.error("❌ Error fetching pets:", error.message);  // ← Log error!
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});



// get /api/pets/:id...
export const getPetById = asyncHandler(async(req,res)=>{
    const pet = await Pet.findById(req.params.id)
                          .populate('owner','name email')

    if(!pet) return res.status(404).json({
        success:false,
        message:'Pet not found'
    })


    // only owner can see theri pet profile ....
    if(pet.owner._id.toString()!== req.user._id.toString()){
        return res.status(403).json({
            success: false,
            message: "not authorized to view this pet"
        })
    }

    res.json({success: true,pet})
})


// put /api/pets/:id....
export const updatePet = asyncHandler(async(req,res)=>{
    const pet = await Pet.findById(req.params.id)


    if(!pet) return res.status(404).json({
        success:false,
        message:'Pet not found'
    })

    // only owner can update their pet ...
    if(pet.owner.toString() !== req.user._id.toString()){
        return res.status(403).json({
            success:false,
            message: "not authorized to update this pet"
        })
    }

    const fields = ['name','species','breed','age','gender','weight','notes']

    fields.forEach(field=>{
        if(req.body[field]!==undefined){
            pet[field]=req.body[field]
        }
    })

    await pet.save()

    res.json({
        success:true,
        message:'pet updated successfully'
    })
})

// delete /api/pets/:id..
export const  deletePet=asyncHandler(async(req,res)=>{
    const pet = await Pet.findById(req.params.id)

    if(!pet) return res.status(404).json({
        success:false,
        message: 'pet not found'
    }) 

    // delete-> keep medical history intact..
    pet.isActive=false

    await pet.save()

    //remove completely from array..
    await User.findByIdAndUpdate(req.user._id,{
        $pull: {pets:pet._id}
    })

    res.json({
        success:true,
        message:'pet removed successfully'
    })
})


// post api/pets/:id/vaccination
export const addVaccination= asyncHandler(async(req,res)=>{
    const {name,date,nextDue}=req.body

    if(!name || !date) return res.status(400).json({
        success:false,
        message: 'Vaccination name and date required'
    })

    const pet = await Pet.findById(req.params.id)

    if(!pet) return res.status(404).json({
        success:false,
        message:'pet not found'
    })

    if(pet.owner.toString() !== req.user._id.toString()){
        return res.status(403).json({
            success:false,
            message: 'not authorized'
        })
    }

    pet.vaccinations.push({name,date,nextDue})
    await pet.save()


    res.json({
        success:true,
        message: 'Vaccination added',
        pet
    })
})


// post /api/pets/:id/medical-history...
export const addMedicalHistory = asyncHandler(async(req,res)=>{
    const {condition, diagnoseOn, treatment,notes}=req.body

    if(!condition) return res.status(400).json({
        success:false,
        message: 'condition is required'
    })

    const pet = await Pet.findById(req.params.id)

    if(!pet) return res.status(404).json({
        success:false,
        message: 'pet not found'
    })


    if(pet.owner.toString()!== req.user._id.toString()){
        return res.status(403).json({
            success:false,
            message: 'not authroixed'
        })
    }


    pet.medicalHistory.push({condition,diagnoseOn,treatment,notes})
    await pet.save()


    res.json({
        success: true ,
        message: 'medical history added'
    })
})


