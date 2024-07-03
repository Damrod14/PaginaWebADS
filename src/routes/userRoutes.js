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

userRoutes.get('/request', getAllRequest); //consultar pedidos
userRoutes.get('/request/:id', getRequestByid_usuario);//consultar pedidos por id
userRoutes.post("/", createUser);
userRoutes.get("/", getAllUsers);
userRoutes.get("/:id", getUserByid_usuario); //busqueda de usuario por ID
userRoutes.post('/login', login);


export {
    userRoutes
};