import { Router } from "express";
import * as projectsService from "../Services/projects.service";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const allProjects = await projectsService.getAll();

        res.json(allProjects);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los proyectos" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const project = await projectsService.getById(userId, id);
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el proyecto" });
    }
});

router.post("/create", async (req, res) => {
    try {
        const { userId } = req.body;
        const newProject = await projectsService.create(userId, req.body);
        res.json(newProject);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el proyecto" });
    }
});

router.put("/add/user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { user, role } = req.body;
        const project = await projectsService.addUserToProject(user, id, role);

        res.json(project);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el proyecto" });
    }
});

router.put("/remove/user/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { user } = req.body;
        const project = await projectsService.removeUserFromProject(user, id);

        res.json(project);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el proyecto" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const project = await projectsService.deleteOne(id);
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el proyecto" });
    }
});

export default router;