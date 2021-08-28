/* eslint-disable no-unused-vars */
import hostelSchema from "../models/hostelSchema";
import { Http } from "@status/codes";

const createHostel = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const { hostel_name, number_of_rooms, price_listing, desc } = req.body;

    const newHostel = await hostelSchema.create({
      hostel_name,
      number_of_rooms,
      price_listing,
      desc,
      hostelManager: user_id,
    });

    res.status(Http.Ok).json({
      success: false,
      data: newHostel,
      msg: "hostel created",
    });
  } catch (error) {
    console.log(error);
    res.status(Http.Forbidden).json({
      success: false,
      data: "",
      msg: "unable to create hostle",
    });
  }
};

const fetchHostel = async (req, res, next) => {
  try {
    const { hostel_id } = req.params;
    const hostel = await hostelSchema.findOne({
      _id: hostel_id,
    });

    if (!hostel) {
      return res.status(Http.NotFound).json({
        success: false,
        data: "",
        msg: "Hostel not found",
      });
    }

    return res.status(Http.Ok).json({
      success: false,
      data: hostel,
      msg: "Hostel  found",
    });
  } catch (error) {
    console.log(error);
    res.status(Http.InternalServerError).json({
      success: false,
      data: "",
      msg: "Server Error",
    });
  }
};

const getAllHostels = async (req, res, next) => {
  try {
    const hostels = await hostelSchema.find();

    if (!hostels) {
      return res.status(Http.NotFound).json({
        success: false,
        data: "",
        msg: "There are no hostels in database currently",
      });
    }

    return res.status(Http.Ok).json({
      success: false,
      data: hostels,
      msg: "Hostels  found",
    });
  } catch (error) {
    console.log(error);
    res.status(Http.InternalServerError).json({
      success: false,
      data: "",
      msg: "Server Error",
    });
  }
};

export { createHostel, fetchHostel, getAllHostels };
