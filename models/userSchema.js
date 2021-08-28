import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    unique: true,
    required: true,
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
  },
  password: {
    required: true,
    type: String,
    minlength: [8, "password cannot be shorter than 8 characters"],
    maxlength: [20, "password cannot be longer than 20 characters"],
  },
  hostels_owned: [
    {
      type: Schema.Types.ObjectId,
      ref: "Hostel",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//hashes user passwords on pre-save database event
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//unhash password and match to request password, returns a boolean
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
