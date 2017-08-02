import { Router } from "express";
import user from "./models/User/routes";
import skill from "./models/Skill/routes";
import work from "./models/Work/routes";
import project from "./models/Project/routes";
import tag from "./models/Tag/routes";
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
router.use("/api/tags", tag);
router.use("/api/works", work);
router.use("/api/projects", project);

export default router;
