import express from "express";
import 'dotenv/config'
import employeeRouter from "./src/route/employee.js";
import { ErrorHandler } from "./src/middleware/error-handler.js";
import { currentUser } from "./src/middleware/current-user.js";
import { requireAuth } from "./src/middleware/require-auth.js";

import sample from "./src/route/sample.js";
import login from "./src/route/login.js";

const app = express()

app.use(express.json())

// app.use(currentUser);
// app.use(requireAuth);

// app.use(employeeRouter);


app.use(employeeRouter)

app.use("/sample", sample);
app.use("/login", login);


app.use(ErrorHandler);

export default app;

