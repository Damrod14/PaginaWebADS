import express from "express";
import {
    createUser,
    getAllUsers,
    getUserByid_usuario,
    login,
    getAllRequest,
    getRequestByid_usuario
} from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get('/request', getAllRequest);
userRoutes.get('/request/:id', getRequestByid_usuario);
userRoutes.post("/", createUser);
userRoutes.get("/", getAllUsers);
userRoutes.get("/:id", getUserByid_usuario);
userRoutes.post('/login', login);


export {
    userRoutes
};