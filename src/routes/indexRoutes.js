import express from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuth.js";

const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
  res.render("index");
});

router.get("/cuenta", ensureAuthenticated, (req, res) => {
  res.render("cuenta");
});

export default router;
