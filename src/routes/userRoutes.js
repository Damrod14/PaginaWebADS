import express from "express";
import {
    createUser,
    getAllUsers,
    getUserByBoleta,
    login,
    getAllRequest,
    getRequestByBoleta
} from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get('/request', getAllRequest);
userRoutes.get('/request/:id', getRequestByBoleta);
userRoutes.post("/", createUser);
userRoutes.get("/", getAllUsers);
userRoutes.get("/:id", getUserByBoleta);
userRoutes.post('/login', login);


export {
    userRoutes
};