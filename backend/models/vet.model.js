import mongoose from 'mongoose'

const vetSchema = new mongoose.Schema({

  // ── Linked user ───────────────────────────────────────────
  user: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'User',
    required: true,
    unique:   true
  },

  // ── Clinic info ───────────────────────────────────────────
  clinicName: {
    type:     String,
    required: true,
    trim:     true
  },
  phone: {
    type:     String,
    required: true
  },
  address: {
    type:     String,
    required: true
  },
  city: {
    type:     String,
    required: true
  },
  bio: {
    type:    String,
    default: ''
  },

  // ── Specializations ───────────────────────────────────────
  specializations: [
    {
      type: String,
      enum: ['dog', 'cat', 'bird', 'rabbit', 'fish', 'reptile', 'other']
    }
  ],

  // ── Experience & fees ─────────────────────────────────────
  experience: {
    type:    Number,
    default: 0
  },
  consultationFee: {
    type:    Number,
    default: 0
  },

  // ── Availability ──────────────────────────────────────────
  availableDays: [
    {
      type: String,
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    }
  ],
  availableSlots: [
    {
      time:     { type: String },
      isBooked: { type: Boolean, default: false }
    }
  ],

  // ── Location (GeoJSON for nearby search) ──────────────────
  location: {
    type: {
      type:    String,
      enum:    ['Point'],
      default: 'Point'
    },
    coordinates: {
      type:    [Number],
      default: [0, 0]
    }
  },

  // ── Photos ────────────────────────────────────────────────
  clinicPhotos: [
    { type: String }
  ],

  // ── Ratings ───────────────────────────────────────────────
  rating: {
    type:    Number,
    default: 0
  },
  totalRatings: {
    type:    Number,
    default: 0
  },

  // ── Verification ──────────────────────────────────────────
  verificationStatus: {
    type:    String,
    enum:    ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  isAvailable: {
    type:    Boolean,
    default: true
  }

}, { timestamps: true })

// ── Index for geo search ──────────────────────────────────────
vetSchema.index({ location: '2dsphere' })

export default mongoose.model('Vet', vetSchema)