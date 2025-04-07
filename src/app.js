import express from "express";

const app = express();

// Routers Imports
import { healthcheck } from "./controllers/healthcheck.controllers";

app.use("/api/v1/healthcheck", healthcheck);

export default app;