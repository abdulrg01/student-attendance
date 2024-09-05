const User = require("../models/user");
const Project = require("../models/project");

const getProjects = async (req, res) => {
  const projects = await Project.find().lean();

  if (!projects?.length) {
    return res.status(400).json({ message: "No projects found" });
  }

  res.json(projects);
};

const getProject = async (req, res) => {
  const projectId = req.params;

  const project = await Project.findById(projectId).exec();

  if (!project) {
    return res.status(400).json({ message: "No project found" });
  }

  res.json(project);
};

const createNewProject = async (req, res) => {
  const { title, userId } = req.body;

  if (!title || !userId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(userId).exec();

  if (!user) {
    return res.status(401).json({ message: "No user found" });
  }

  const newProject = await Project.create({ title, user });

  if (newProject) {
    res.status(201).json({ message: `New project ${title} was created` });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
};

const updateProject = async(req, res) => {

}

module.exports = { createNewProject, getProjects, getProject, updateProject };
