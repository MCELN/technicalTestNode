import { Router } from "express";
import * as usersService from "../Services/users.service";
import * as projectsServices from "../Services/projects.service";


const router = Router();

router.get("/", async (req, res) => {
    try {
        const allUsers = await usersService.getAll();

        res.json(allUsers);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await usersService.getById(id);
        res.json(user);
    } catch (error) {
        
    }
})

router.post("/create", async (req, res) => {
    try {
        const newUser = await usersService.create(req.body);
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario" });
    }
});

router.put("/project/exit/:projectId", async (req, res) => {
    try {
        const { projectId } = req.params;
        const { userId } = req.body;
        await projectsServices.removeUserFromProject(userId, projectId);
        res.json("success");
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedUser = await usersService.deleteById(req.params.id);
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario" });
    }
});


export default router;