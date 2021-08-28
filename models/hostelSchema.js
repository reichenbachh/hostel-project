import mongoose from "mongoose";
const { Schema } = mongoose;

const hostelSchema = new Schema({
  hostelManager: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hostel_name: {
    required: true,
    type: String,
    trim: true,
    minlength: [8, "Hostel name cannot be shorter than 8 characters"],
    maxlength: [30, "Hostel name cannot be longer than 8 characters"],
  },
  number_of_rooms: {
    type: Number,
    required: true,
  },
  bookedRequests: [
    {
      type: String,
      listing_type: {
        type: String,
        enum: ["premuim", "luxury", "regular"],
      },
      createAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  price_listing: {
    regular: { type: String, required: true },
    luxury: { type: String, required: true },
    premuim: { type: String, required: true },
  },
  imageUrl: String,
  desc: {
    required: true,
    type: String,
    maxlength: [200, "Hostel description cannot be more than 200"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Hostel", hostelSchema);
