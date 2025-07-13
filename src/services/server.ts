import express from "express";
import router from "../routes/router";

const app = express();

app.use(router);

app.listen(3000, ()=> console.warn("Server is running on port 3000"));