import { Router } from "express";
import driverRoutes from "./driver/index.js";
import clientRoutes from "./client/index.js";
import adminRoutes from "./admin/index.js";
import sharedRoutes from "./shared/index.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = Router();
router.use("/driver", driverRoutes);
router.use("/client", clientRoutes);
router.use("/admin", authenticate, requireRole('ADMIN'), adminRoutes);
router.use("/shared", sharedRoutes);

export default router;