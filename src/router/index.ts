import { Application } from "express";
import usersController from "../Controllers/users.controller";

const router = (app: Application) => {
    app.use("/api/users", usersController);
}

export default router;