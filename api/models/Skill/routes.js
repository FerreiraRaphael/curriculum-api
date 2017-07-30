import { Router } from "express";
import controller from "./controller";
import AuthPolicy from "../../policys/auth";

const router = new Router();

router
  .route("/")
  .get((...args) => controller.find(...args))
  .post([...AuthPolicy.authUser(), (...args) => controller.create(...args)]);

router
  .route("/:id")
  .get([(...args) => controller.findById(...args)])
  .put([...AuthPolicy.authUser(), (...args) => controller.update(...args)])
  .delete([...AuthPolicy.authUser(), (...args) => controller.remove(...args)]);

export default router;
