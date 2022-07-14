import { Router } from "express";
import professional_routes from "./professional.route.js";

const router = Router();

router.use("", professional_routes);

export default router;
