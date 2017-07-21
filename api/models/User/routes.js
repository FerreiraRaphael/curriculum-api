import { Router } from "express";
// import passport from "passport";
import controller from "./controller";

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
  .put((...args) => controller.update(...args))
  .get((...args) => controller.findById(...args))
  .delete((...args) => controller.remove(...args));
// router
//   .route("/")
/**
 * @swagger
 * /api/users/:
 *   get:
 *     tags:
 *       - Users
 *     description: Return the current user, need to be logged
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: the current user
 *         schema:
 *           $ref: '#/definitions/User'
 */
// .get([passport.authenticate("bearer", { session: false }), controller.find])
// .post(controller.create)
// .put([passport.authenticate("bearer", { session: false }), controller.update])
// .delete([
//   passport.authenticate("bearer", { session: false }),
//   controller.remove
// ]);

// router
//   .route("/:id")
//   .get(controller.findById)
//   .delete(controller.remove);

router.route("/auth").post(controller.auth);

export default router;