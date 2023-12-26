import { Router } from "express";

import donationRouter from "@routes/donation";
import salesRouter from "@routes/sales";

const recordRouter = Router();

recordRouter.use("/donation", donationRouter);
recordRouter.use("/sales", salesRouter);

export default recordRouter;
