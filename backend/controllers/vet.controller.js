import Vet          from '../models/vet.model.js'
import User         from '../models/user.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'

// ── POST /api/vets/create-profile ─────────────────────────────
export const createVetProfile = asyncHandler(async (req, res) => {
  console.log('createVetProfile hit')
  console.log('req.body:', req.body)

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
  } = req.body

  const existing = await Vet.findOne({ user: req.user._id })
  if (existing) return res.status(400).json({
    success:  false,
    message: 'Vet profile already exists'
  })

  const vet = await Vet.create({
    user:            req.user._id,
    clinicName,
    phone,
    address,
    city,
    bio:             bio            || '',
    specializations: specializations || [],
    experience:      experience      || 0,
    consultationFee: consultationFee || 0,
    availableDays:   availableDays   || [],
    availableSlots:  availableSlots  || [],
    location: {
      type:        'Point',
      coordinates: Array.isArray(coordinates) ? coordinates.map(Number) : [0, 0]
    }
  })

  res.status(201).json({
    success: true,
    message: 'Vet profile created successfully',
    vet
  })
})

// ── GET /api/vets/my-profile ──────────────────────────────────
export const getMyVetProfile = asyncHandler(async (req, res) => {
  const vet = await Vet.findOne({ user: req.user._id })
    .populate('user', 'name email avatar')

  if (!vet) return res.status(404).json({
    success: false,
    message: 'Vet profile not found'
  })

  res.json({ success: true, vet })
})

// ── PUT /api/vets/update-profile ──────────────────────────────
export const updateVetProfile = asyncHandler(async (req, res) => {
  const { clinicName, phone, address, city, bio, coordinates } = req.body;
  const vetId = req.user._id;

  let vet = await Vet.findOne({ user: vetId });

  if (!vet) {
    return res.status(404).json({ success: false, message: "Vet not found" });
  }

  // Update basic info
  if (clinicName) vet.clinicName = clinicName;
  if (phone) vet.phone = phone;
  if (address) vet.address = address;
  if (city) vet.city = city;
  if (bio) vet.bio = bio;

  // ✅ Update vet profile photo
  if (req.files && req.files.profilePhoto) {
    try {
      const file = req.files.profilePhoto[0];
      const result = await uploadToCloudinary(
        file.path,
        'fluffyfriends/vet-profiles'
      );
      
      // Update user avatar (doctor photo)
      await User.findByIdAndUpdate(req.user._id, {
        avatar: result.url,
      });

      const fs = await import('fs').then(m => m.default);
      fs.unlinkSync(file.path);
    } catch (error) {
      throw new Error('Failed to upload profile photo');
    }
  }

  // ✅ Handle clinic photos
  if (req.files && req.files.clinicPhotos) {
    try {
      const uploadedUrls = [];
      for (const file of req.files.clinicPhotos) {
        const result = await uploadToCloudinary(
          file.path,
          'fluffyfriends/clinic-photos'
        );
        uploadedUrls.push(result.url);

        const fs = await import('fs').then(m => m.default);
        fs.unlinkSync(file.path);
      }
      vet.clinicPhotos = [...(vet.clinicPhotos || []), ...uploadedUrls];
    } catch (error) {
      throw new Error('Failed to upload clinic photos');
    }
  }

  await vet.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    vet,
  });
});

// ── GET /api/vets/nearby ──────────────────────────────────────
export const getNearbyVets = asyncHandler(async (req, res) => {
  const { longitude, latitude, maxDistance = 10000, species } = req.query

  if (!longitude || !latitude) return res.status(400).json({
    success: false,
    message: 'Longitude and latitude are required'
  })

  const query = {
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

  if (species) query.specializations = species

  const vets = await Vet.find(query)
    .populate('user', 'name email avatar')
    .select('-availableSlots')

  res.json({
    success: true,
    count:   vets.length,
    vets
  })
})

// ── GET /api/vets/:id ─────────────────────────────────────────
export const getVetById = asyncHandler(async (req, res) => {
  const vet = await Vet.findById(req.params.id)
    .populate('user', 'name email avatar')

  if (!vet) return res.status(404).json({
    success: false,
    message: 'Vet not found'
  })

  res.json({ success: true, vet })
})

// ── GET /api/vets ─────────────────────────────────────────────
export const getAllVets = asyncHandler(async (req, res) => {
  const { city, species } = req.query
  const query = { verificationStatus: 'approved' }

  if (city)    query.city            = { $regex: city, $options: 'i' }
  if (species) query.specializations = species

  const vets = await Vet.find(query)
    .populate('user', 'name email avatar')
    .select('-availableSlots')

  res.json({
    success: true,
    count:   vets.length,
    vets
  })
})

// search vet functionality...
export const searchVets = asyncHandler(async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.json({
      success: true,
      vets: []
    });
  }

  const vets = await Vet.find({
    verificationStatus: "approved",
    isAvailable: true,
    $or: [
      {
        clinicName: {
          $regex: q,
          $options: "i",
        },
      },
      {
        city: {
          $regex: q,
          $options: "i",
        },
      },
      {
        address: {
          $regex: q,
          $options: "i",
        },
      },
      {
        specializations: {
          $regex: q,
          $options: "i",
        },
      },
    ],
  })
    .populate("user", "name email avatar")
    .select("-availableSlots");

  res.json({
    success: true,
    count: vets.length,
    vets,
  });
});