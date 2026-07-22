import {Router} from "express";
import {suggestLocation} from "../../controllers/client/suggestLocation.controller.js";
import {authenticate} from "../../middlewares/auth.middleware.js";

const router = Router();

router.post('/suggest-location', authenticate, suggestLocation);

export default router;