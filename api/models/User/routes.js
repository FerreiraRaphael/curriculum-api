import { Router } from "express";
import controller from "./controller";
import AuthPolicy from "../../policys/auth";
/**
 * @swagger
 * definition:
 *   User:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       description:
 *         type: string
 */

const router = new Router();
router
  .route("/")
  .get((...args) => controller.find(...args))
  .post((...args) => controller.create(...args));

router
  .route("/:id")
  /**
   * @swagger
   * /api/users/:
   *   get:
   *     tags:
   *       - Users
   *     description: Return a user with the ID
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: The
   *         schema:
   *           $ref: '#/definitions/User'
   */
  .get((...args) => controller.findById(...args))
  .put([...AuthPolicy.authUser(), (...args) => controller.update(...args)])
  .delete((...args) => controller.remove(...args));

router.route("/auth").post((...args) => controller.auth(...args));

export default router;
