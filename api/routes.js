import { Router } from "express";
import user from "./models/User/routes";
import skill from "./models/Skill/routes";
import swaggerSpec from "./tools/swagger";

const router = new Router();

router.route("/").get((req, res) => {
  res.json({ message: "Hello Flow!" });
});

router.route("/swagger.json").get((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

router.use("/api/users", user);
router.use("/api/skills", skill);

export default router;
