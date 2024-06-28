import express from "express";
import prisma from "../models/user.js";
import prismaAdmin from "../models/admin.js";
export const createUser = async (req, res) => {
  try {
    const {
      boleta,
      email,
      nombre,
      contrasena,
      esAdministrador
    } = req.body;

    if (!boleta || !email || !nombre || !contrasena || esAdministrador === undefined) {
      res.status(400).json({
        message: "Todos los campos son obligatorios"
      });
      return;
    }

    const user = await prisma.create({
      data: {
        boleta: boleta,
        email: email,
        nombre: nombre,
        contrasena: contrasena,
        esAdministrador: esAdministrador
      },
    });

    res.status(201).json({
      message: "Usuario creado exitosamente",
      user
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({
      message: 'Error al crear el usuario',
      error: error.message
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.findMany();

    res.status(201).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Hubo un error, pruebe mas tarde"
    });
  }
};

export const getUserByBoleta = async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await prisma.findUnique({
      where: {
        boleta: userId
      },
      select: {
        boleta: true,
        contrasena: true,
      },
    });
    if (!user) {
      res.status(404).json({
        error: "El Usuario no fue encontrado"
      });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Hubo un error, pruebe mas tarde"
    });
  }
};

export const login = async (req, res) => {
  try {
    const {
      boleta,
      contrasena
    } = req.body;

    if (!boleta || !contrasena) {
      return res.status(400).json({
        message: "La boleta y contraseña son obligatorios",
      });
    }

    const user = await prisma.findUnique({
      where: {
        boleta: boleta
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado"
      });
    }

    if (user.contrasena !== contrasena) {
      return res.status(401).json({
        message: "Contraseña incorrecta"
      });
    }

    return res.status(200).json({
      message: "Login exitoso",
      user: {
        boleta: user.boleta,
        nombre: user.nombre,
        esAdministrador: user.esAdministrador,
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Hubo un error, pruebe más tarde"
    });
  }
};

export const getAllRequest = async (req, res) => {
  try {
    const bookRequest = await prismaAdmin.findMany();

    res.status(200).json(bookRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Hubo un error, pruebe mas tardee",
    });
  }
};

export const getRequestByBoleta = async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const bookRequest = await prismaAdmin.findMany({
      where: {
        userBoleta: userId
      }
    }, );

    res.status(200).json(bookRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Hubo un error, pruebe mas tardee",
    });
  }
};