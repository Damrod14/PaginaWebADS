import express from "express";
import prisma from "../models/user.js";

export const createUser = async (req, res) => {
  try {
    const { boleta, email, nombre, contrasena } = req.body;

    if (!boleta) {
      res.status(400).json({
        message: "La boleta es obligatoria",
      });
      return;
    }

    if (!email) {
      res.status(400).json({
        message: "El email es obligatorio",
      });
      return;
    }

    if (!nombre) {
      res.status(400).json({
        message: "La boleta es obligatoria",
      });
      return;
    }

    if (!contrasena) {
      res.status(400).json({
        message: "La contraseña es obligatoria",
      });
      return;
    }

    const user = await prisma.create({
      data: {
        boleta: boleta,
        email: email,
        nombre: nombre,
        contrasena: contrasena,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    if (error?.code === "P2002" && error?.meta?.target?.includes("email")) {
      res.status(400).json({
        message: "El email ingresado ya existe",
      });
    }

    console.log(error);
    res.status(500).json({ error: "Hubo un error, pruebe mas tarde" });
  }
};
