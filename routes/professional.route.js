import { Router } from "express";
import { professionals_controller } from "../controllers/professional.controller.js";
import authToken from "../middleware/authenticate.js";

const router = Router();
const root_route = "/professional";

router.get(root_route + "/test", professionals_controller.test_route);
router.get(
  root_route + "/token",
  authToken,
  professionals_controller.test_token
);

router.post(root_route + "/create", professionals_controller.create_user);

router.put(
  root_route + "/create_patient",
  professionals_controller.create_patient
);
router.post(root_route + "/login", professionals_controller.post_login);

router.post(
  root_route + "/create_meal",
  professionals_controller.create_daily_meal
);

export default router;
