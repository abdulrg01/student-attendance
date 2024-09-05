const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyJwt");
const project = require("../controllers/project");

router.route("/new-project").post(verifyJWT, project.createNewProject);

router.route("/get-all-project").get(verifyJWT, project.getProjects);

router.route("/get-a-project/:id").get(verifyJWT, project.getProject);

router.route("/update-project").put(verifyJWT, project.updateProject);

module.exports = router;
