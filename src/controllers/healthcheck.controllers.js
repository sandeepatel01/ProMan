import { ApiResponse } from "../utils/ApiResponse.js";

const healthcheck = (req, res) => {
  res.status(200).json(new ApiResponse(200, { message: "Server is healthy" }));
};

export { healthcheck };