/* eslint-disable no-unused-vars */
import userSchema from "../models/userSchema";
import hostelSchema from "../models/hostelSchema";
import { Http } from "@status/codes";

const createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExists = await userSchema.findOne({ email });

    if (userExists) {
      return res.status(Http.Unauthorized).json({
        success: false,
        data: "",
        msg: "This user already exits",
      });
    }

    const user = await userSchema.create({ email, password });
    res.status(Http.Created).json({
      sucess: true,
      data: user,
      msg: "user created",
    });
  } catch (error) {
    console.log(error);
    res.status(Http.Unauthorized).json({
      success: false,
      msg: "user was not created",
      data: "",
    });
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const userExists = await userSchema
    .findOne({
      email,
    })
    .populate("hostels_owned");

  const isPasswordValid = await userExists.matchPassword(password);

  console.log(isPasswordValid);

  if (!isPasswordValid || !userExists) {
    return res.status(Http.Unauthorized).json({
      sucess: false,
      data: "",
      msg: "invalid credentials",
    });
  }

  const hostelsOwned = await hostelSchema.find({
    hostelManager: userExists._id,
  });

  console.log(hostelsOwned);

  //add hostel object unto response
  userExists.hostels_owned = hostelsOwned;

  res.status(Http.Ok).json({
    success: true,
    data: userExists,
    msg: "user login successful",
  });
};

export { createUser, loginUser };
