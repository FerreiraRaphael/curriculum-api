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
router.route("/").post((...args) => controller.create(...args));

router
  .route("/me")
  .get([AuthPolicy.authUser(), (...args) => controller.me(...args)]);

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
  .get([
    ...AuthPolicy.isCurrentUser(),
    (...args) => controller.findById(...args)
  ])
  .put([...AuthPolicy.isCurrentUser(), (...args) => controller.update(...args)])
  .delete([
    ...AuthPolicy.isCurrentUser(),
    (...args) => controller.remove(...args)
  ]);

router.route("/auth").post((...args) => controller.auth(...args));

export default router;
