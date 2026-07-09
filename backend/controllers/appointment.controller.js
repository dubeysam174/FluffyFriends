import Appointment from "../models/appointment.model.js";
import Vet from "../models/vet.model.js";
import Pet from "../models/pet.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// post /api/appointments/book...
// pet owner books appointment

export const bookAppointment = asyncHandler(async (req, res) => {
  const { vetId, petId, date, slot, type, reason } = req.body;

  if (!vetId || !petId || !date || !slot)
    return res.status(400).json({
      success: false,
      message: "vetId,petId,date and slot are required",
    });

  // checking if vet exists and is approved or not ...
  const vet = await Vet.findById(vetId);
  if (!vet)
    return res.status(404).json({
      success: false,
      message: "Vet not found",
    });

  if (vet.verificationStatus !== "approved")
    return res.status(400).json({
      success: false,
      message: "this vet is not yet approved",
    });

  // check if pet exists and belongs to this user ...
  const pet = await Pet.findById(petId);
  if (!pet)
    return res.status(404).json({
      success: false,
      message: "Pet not found",
    });

  if (pet.owner.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "This pet doesnt not belong to you",
    });
  }

  // check if slot is available or not ....
  const slotIndex = vet.availableSlots.findIndex(
    (s) => s.time === slot && !s.isBooked,
  );

  if (slotIndex === -1)
    return res.status(400).json({
      success: false,
      message: "This slot is not available",
    });

  // create appointment...
  const appointment = await Appointment.create({
    petOwner: req.user._id,
    vet: vetId,
    pet: petId,
    date,
    slot,
    type: type || "inPerson",
    reason: reason || "",
    fee: vet.consultationFee,
  });

  // mark slot as booked...
  vet.availableSlots[slotIndex].isBooked = true;
  await vet.save();

  res.status(201).json({
    success: true,
    message: "Appointment booked successfully",
    appointment,
  });
});

// get /api/appointments/my-appointments...
// pet owneer sees their own bookings..
export const getMyAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ petOwner: req.user._id })
    .populate("vet", "clinicName phone address city")
    .populate("pet", "name species breed")
    .sort({ date: -1 });

  res.json({
    success: true,
    count: appointments.length,
    appointments,
  });
});

// get /api/appointments/vet-appointments
// vet sees appointments booked with them ...
export const getVetAppointments = asyncHandler(async (req, res) => {
  const vet = await Vet.findOne({ user: req.user._id });
  if (!vet)
    return res.status(404).json({
      success: false,
      message: "Vet Profile not found",
    });

  const appointments = await Appointment.find({ vet: vet._id })
    .populate("petOwner", "name email")
    .populate("pet", "name species breed age")
    .sort({ date: -1 });

  res.json({
    success: true,
    count: appointments.length,
    appointments,
  });
});

// get /api/appointments/:id...
//either party views single appointment..
export const getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate("petOwner", "name email")
    .populate("vet", "clinicName phone address city ")
    .populate("pet", "name species breed age ");

  if (!appointment)
    return res.status(404).json({
      success: false,
      message: "appointment not found",
    });

  // check user is either the pet owner or the vet...
  const vet = await Vet.findOne({ user: req.user._id });
  const isOwner =
    appointment.petOwner._id.toString() === req.user._id.toString();
const isVet = vet && appointment.vet._id.toString() === vet._id.toString();
  if (!isOwner && !isVet)
    return res.status(403).json({
      success: false,
      message: "not authorized to view this appointment",
    });

  res.json({ success: true, appointment });
});

// put /api/appointment/:id/confirm
//vet confirms appointment
export const confirmAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment)
    return res.status(404).json({
      success: false,
      message: "Appointment not found",
    });

  const vet = await Vet.findOne({ user: req.user._id });
  if (!vet || appointment.vet.toString() !== vet._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "not authorized",
    });
  }

  appointment.status = "confirmed";
  await appointment.save();

  res.json({
    success: true,
    message: "Appointment confirmed",
    appointment,
  });
});

// put /api/appointment/:id/reject
// vet rejects appointment
export const rejectAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment)
    return res.status(404).json({
      success: false,
      message: "Appointment not found",
    });

  const vet = await Vet.findOne({ user: req.user._id });
  if (!vet || appointment.vet.toString() !== vet._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "not authorized",
    });
  }

  appointment.status = "cancelled";
  await appointment.save();

  // free up the slot..
  const slotIndex = vet.availableSlots.findIndex(
    (s) => s.time === appointment.slot,
  );
  if (slotIndex !== -1) {
    vet.availableSlots[slotIndex].isBooked = false;
    await vet.save();
  }

  res.json({
    success: true,
    message: "appointment rejected",
    appointment,
  });
});

// put /api/appointments/:id/cancel...
//pet owneer cancles their own appointment...
export const cancelAppointments = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment)
    return res.status(404).json({
      success: false,
      message: "Appointment not found",
    });

  if (appointment.petOwner.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "not authorized",
    });
  }

  if (appointment.status === "completed")
    return res.status(400).json({
      success: false,
      message: "cannot cancel a completed appointment",
    });

  appointment.status = "cancelled";
  await appointment.save();

  // free up the slot...
  
    const vet = await Vet.findById(appointment.vet);
    if(vet){
    const slotIndex = vet.availableSlots.findIndex(
      (s) => s.time === appointment.slot,
    );

    if (slotIndex !== -1) {
      vet.availableSlots[slotIndex].isBooked = false;
      await vet.save();
    }
  }

  res.json({
    success: true,
    message: "Appointment cancelled",
    appointment,
  });
});

// put /api/appointments/:id/complete...
// vet marks appointment complete + adds prescription

export const completeAppointment = asyncHandler(async (req, res) => {
  const { medicines, instructions, followUpDate } = req.body;

  const appointment = await Appointment.findById(req.params.id);

  if (!appointment)
    return res.status(404).json({
      success: false,
      message: "Appointment not found",
    });

  const vet = await Vet.findOne({ user: req.user._id });

  if (!vet || appointment.vet.toString() !== vet._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "not authorized",
    });
  }

  appointment.status = "completed";
  appointment.prescription = {
    medicines: medicines || [],
    instructions: instructions || "",
    followUpDate: followUpDate || null,
  };

  await appointment.save();

  res.json({
    success: true,
    message: "Appointment marked completed",
    appointment,
  });
});