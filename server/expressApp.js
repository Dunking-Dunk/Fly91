import express from "express";
import "dotenv/config";
import "express-async-errors"
import cookieParser from "cookie-parser";
import cors from 'cors'

import employeeRouter from "./src/route/employee.js";
import { ErrorHandler } from "./src/middleware/error-handler.js";
import { currentUser } from "./src/middleware/current-user.js";
import { requireAuth } from "./src/middleware/require-auth.js";

import sample from "./src/route/sample.js";
import login from "./src/route/login.js";

const app = express();

app.use(
    cors({
      origin: ["*"],
      methods: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
  );


app.use(express.json());
app.use(cookieParser());

app.use('/api', login);

// app.use(employeeRouter);
// app.use("/sample", sample);

// app.use(currentUser);
// app.use(requireAuth);

// this function will work only when the cookie named 'auth' with correct jwt value is passed in

app.use('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(ErrorHandler);

export default app;
