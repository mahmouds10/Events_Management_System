import { Router } from "express";

import handelError from "../../middlewares/localErrorHandler.middleware.js";
import validate from "../../middlewares/validation.middleware.js";
import multerMiddleware from "../../middlewares/multer.middleware.js";
import * as controller from "./auth.controller.js";
import * as schemas from "./auth.validation.js.js";
import authenticate from "../../middlewares/authentication.middleware.js";
import authorize from "../../middlewares/authorization.middleware.js";
import { roles } from "../../utils/roles.utils.js";
// Create a new router for auth routes
const router = Router();

// Signup route
router.post(
    "/signup",
    multerMiddleware().single("profilePicture"),
    validate(schemas.signupSchema),
    handelError(controller.signup)
);

// Login route
router.post(
    "/login",
    validate(schemas.loginSchema),
    handelError(controller.login)
);

// Add admin route
router.post(
    "/add-admin",
    authenticate,
    authorize(roles.ADMIN),
    multerMiddleware().single("profilePicture"),
    validate(schemas.signupSchema),
    handelError(controller.addAdmin)
);

// Change role route
router.patch(
    "/change-role/:userId",
    authenticate,
    authorize(roles.ADMIN),
    handelError(controller.changeRole)
);

// Get user data route
router.get(
    "/user-data",
    authenticate,
    handelError(controller.getUserData)
);

// Get all users route
router.get(
    "/all-users",
    authenticate,
    authorize(roles.ADMIN),
    handelError(controller.getAllUsers)
);

export default router;
