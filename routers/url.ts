import express from "express";
import { getUrl, persistUrl } from "../controllers/url";
export const urlRouter = express.Router();

urlRouter.post("/urls", persistUrl);
urlRouter.get("/urls/:url", getUrl);
