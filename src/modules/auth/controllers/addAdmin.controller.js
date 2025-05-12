import { signup } from "./signup.controller.js";

export const addAdmin = async (req, res, next) => {
    req.body.role = "admin";
    return signup(req, res, next); 
};