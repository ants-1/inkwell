import { Router } from "express";
import { 
    getUserController, 
    updateUserController, 
    updateUserPasswordController 
} from "./userController";
import { verifyToken } from "../../middleware/authMiddleware";

const router = Router();

router.get(
    "/users/:id",
    getUserController
);

router.put(
    "/users/:id",
    verifyToken,
    updateUserController
);

router.put(
    "/users/:id/password",
    verifyToken,
    updateUserPasswordController
);

export default router;
