import express, { Request, Response } from "express";
import MongoConnection from "./DB";
import router from "./router";

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

MongoConnection.getInstance();

router(app);

export default app;