import "express-async-errors";
import express, { Application } from "express";
import { scheduleRoutes } from "./routers/schedule.routes";
import { handleErrors } from "./errors";
import { categoryRoutes } from "./routers/category.routes";
import { loginRoutes } from "./routers/loginUser.routes";
import { realEstateRoutes } from "./routers/realEstate.routes";
import { userRoutes } from "./routers/users.routes";

const app: Application = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/categories", categoryRoutes);
app.use("/realEstate", realEstateRoutes);
app.use("/schedules", scheduleRoutes);
app.use(handleErrors);

export default app;
