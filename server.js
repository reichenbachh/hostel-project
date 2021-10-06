import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConfig";
import morgan from "morgan";

//importing route files
import { router as userRouter } from "./routes/users";
import { router as hostelRouter } from "./routes/hostels";
// eslint-disable-next-line no-unused-vars
import colors from "colors";

const app = express();

//accessing environment variables
dotenv.config({ path: "./config/config.env" });

//Parse requests with application/Json headers
app.use(express.json());

app.use(morgan("dev"));

//establish connection to MongoDB atlas shard
connectDB();

//mount routes unro url
app.use("/auth", userRouter);
app.use("/hostel", hostelRouter);

//express app instance
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} in ${process.env.ENV} mode `.bgBlack.italic
      .underline
  );
});
