import express from "express";
import "dotenv/config";
import employeeRouter from "./src/route/employee.js";
import { ErrorHandler } from "./src/middleware/error-handler.js";
import { currentUser } from "./src/middleware/current-user.js";
import { requireAuth } from "./src/middleware/require-auth.js";

import cookieParser from "cookie-parser";

import sample from "./src/route/sample.js";
import login from "./src/route/login.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

// app.use(employeeRouter);

app.use(employeeRouter);

app.use("/sample", sample);
app.use("/login", login);

app.use(currentUser);
app.use(requireAuth);

// this function will work only when the cookie named 'auth' with correct jwt value is passed in
app.get("/testt", (req, res) => {
    res.status(200).send("hola");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || "Something went wrong!",
        error: process.env.NODE_ENV === "production" ? {} : err, // Hide detailed error info in production
    });
});

app.use(ErrorHandler);

export default app;
