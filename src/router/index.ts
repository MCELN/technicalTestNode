import { Application } from "express";
import usersController from "../Controllers/users.controller";
import projectsController from "../Controllers/projects.controller";


const router = (app: Application) => {
    app.use("/api/users", usersController);
    app.use("/api/projects", projectsController);
}

export default router;