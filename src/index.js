import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/db.js";

dotenv.config({
  path: "./.env"
});

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is Running on port: ${PORT}`);
    })
  })
  .catch((error) => {
    console.error("Mongodb Connection error", error);
    process.exit(1)
  })