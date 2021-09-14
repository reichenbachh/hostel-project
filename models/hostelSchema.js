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
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      course: {
        type: String,
        required: true,
      },
      level: {
        type: String,
        required: true,
      },
      indexNumber: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please enter a valid email",
        ],
      },
      phone: {
        type: Date,
        default: Date.now,
        match: [
          /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
          "Please enter a valid phone number",
        ],
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
