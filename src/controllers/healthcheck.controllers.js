import { ApiResponse } from "../utils/ApiResponse.js";

const healthcheck = (req, res) => {
  try {
    res.status(200).json(new ApiResponse(200, { message: "Server is healthy" }));
  } catch (error) {

  }
};

export { healthcheck };