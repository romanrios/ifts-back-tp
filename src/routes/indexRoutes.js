import express from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuth.js";

const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
  res.render("inicio/index");
});

router.get("/cuenta", ensureAuthenticated, (req, res) => {
  res.render("inicio/cuenta");
});

export default router;
