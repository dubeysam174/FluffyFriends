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
  const vet = await Vet.findOne({ user: req.user._id })

  if (!vet) return res.status(404).json({
    success: false,
    message: 'Vet profile not found'
  })

  const fields = [
    'clinicName', 'phone', 'address', 'city', 'bio',
    'specializations', 'experience', 'consultationFee',
    'availableDays', 'availableSlots', 'isAvailable'
  ]

  fields.forEach(field => {
    if (req.body[field] !== undefined) {
      vet[field] = req.body[field]
    }
  })

  if (req.body.coordinates) {
    vet.location = {
      type:        'Point',
      coordinates: req.body.coordinates
    }
  }

  await vet.save()

  res.json({
    success: true,
    message: 'Vet profile updated',
    vet
  })
})

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