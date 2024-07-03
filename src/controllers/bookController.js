import express from "express";
import prisma from "../models/book.js";
import prisma2 from "../models/user.js";
import prismaAdmin from "../models/admin.js";
import book from "../models/book.js";

export const createBook = async (req, res) => {
  try {
    const { titulo, autor, descripcion, portada, cantidad, cantidadVendidos, id_libro,editorial,edicion,precio } =
      req.body;

    if (!titulo) {
      res.status(400).json({
        message: "El titulo es obligatorio",
      });
      return;
    }

    if (!precio) {
      res.status(400).json({
        message: "El precio es obligatorio",
      });
      return;
    }

    if (!autor) {
      res.status(400).json({
        message: "El autor es obligatorio",
      });
      return;
    }

    if (!descripcion) {
      res.status(400).json({
        message: "La descripcion es obligatoria",
      });
      return;
    }

    if (!portada) {
      res.status(400).json({
        message: "La portada es obligatoria",
      });
      return;
    }

    if (!cantidad) {
      res.status(400).json({
        message: "La cantidad de copias es obligatoria",
      });
      return;
    }
    if (!id_libro) {
      res.status(400).json({
        message: "El codigo de barras es obligatorio",
      });
      return;
    }

    if (!edicion) {
      res.status(400).json({
        message: "La edicion es obligatoria",
      });
      return;
    }
    if (!editorial) {
      res.status(400).json({
        message: "La editorial es obligatoria",
      });
      return;
    }

    const book = await prisma.create({
      data: {
        titulo: titulo,
        id_libro: id_libro,
        editorial:editorial,
        edicion:edicion,
        precio: precio,
        autor: autor,
        descripcion: descripcion,
        portada: portada,
        cantidad: cantidad,
        cantidadVendidos: cantidadVendidos,
      },
    });

    res.status(201).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Hubo un error, pruebe mas tarde",
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await prisma.findMany();

    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Hubo un error, pruebe mas tarde",
    });
  }
};

export const getBookById = async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const book = await prisma.findUnique({
      where: {
        id_libro: bookId,
      },
    });
    if (!book) {
      res.status(404).json({
        error: "El libro no fue encontrado",
      });
      return;
    }

    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Hubo un error, pruebe mas tarde",
    });
  }
};

export const updateBook = async (req, res) => {
  const bookId = parseInt(req.params.id);
  const { titulo, autor, descripcion, portada, cantidad, cantidadVendidos,editorial,edicion } =
    req.body;

  try {
    let dataToUpdate = {
      ...req.body,
    };
    if (titulo) {
      dataToUpdate.titulo = titulo;
    }
    if (autor) {
      dataToUpdate.autor = autor;
    }
    if (descripcion) {
      dataToUpdate.descripcion = descripcion;
    }
    if (portada) {
      dataToUpdate.portada = portada;
    }
    if (cantidad) {
      dataToUpdate.cantidad = cantidad;
    }
    if (cantidadVendidos) {
      dataToUpdate.cantidadVendidos = cantidadVendidos;
    }
    if (editorial) {
      dataToUpdate.editorial = editorial;
    }
    if (edicion) {
      dataToUpdate.edicion = edicion;
    }

    const book = await prisma.update({
      where: {
        id_libro: bookId,
      },
      data: dataToUpdate,
    });
    res.status(200).json(book);
  } catch (error) {
    if (error?.code === "P2025") {
      res.status(404).json("Libro no encontrado");
    } else {
      console.log(error);
      res.status(500).json({
        error: "Hubo un error, pruebe mas tarde",
      });
    }
  }
};

export const deleteBook = async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    await prisma.delete({
      where: {
        id_libro: bookId,
      },
    });
    res
      .status(200)
      .json({
        message: `El libro ${bookId} ha sido eliminado correctamente`,
      })
      .end();
  } catch (error) {
    if (error?.code === "P2025") {
      res.status(404).json("Libro no encontrado");
    } else {
      console.log(error);
      res.status(500).json({
        error: "Hubo un error, pruebe mas tarde",
      });
    }
  }
};

export const searchBook = async (req, res) => {
  const { palabra } = req.query;
  try {
    const books = await prisma.findMany({
      where: {
        OR: [
          {
            titulo: {
              contains: palabra,
            },
          },
          {
            editorial: {
              contains: palabra,
            },
          },
          {
            autor: {
              contains: palabra,
            },
          },
        ],
      },
    });

    res.status(200).json(books);
  } catch (error) {
    if (error?.code === "P2025") {
      res.status(404).json("Libro no encontrado");
    } else {
      console.log(error);
      res.status(500).json({
        error: "Hubo un error, pruebe mas tarde",
      });
    }
  }
};

export const requestBook = async (req, res) => {
  const { id_libro, id_usuario, pago } = req.body;

  try {
    const book = await prisma.findUnique({
      where: {
        id_libro: id_libro,
      },
    });
    const user = await prisma2.findUnique({
      where: {
        id_usuario: id_usuario,
      },
    });

    if (!book) {
      return res.status(404).json({
        message: "El libro no fue encontrado",
      });
    }

    if (!user) {
      return res.status(404).json({
        message: "El usuario no fue encontrado",
      });
    }

    if (book.cantidad <= book.cantidadVendidos) {
      return res.status(400).json({
        message: "No hay copias disponibles",
      });
    }

    if (book.cantidad != 0) {
      // Actualizar la cantidad de libros vendidos
      const updatedBook = await prisma.update({
        where: {
          id_libro: id_libro,
        },
        data: {
          cantidad: book.cantidad - 1,
          cantidadVendidos: book.cantidadVendidos + 1,
        },
      });
      if (pago === 'efectivo'){
          // Obtener la fecha actual
        const hoy = new Date();

        // Sumar 1 día a la fecha actual
        const futuro = new Date(hoy);
        futuro.setDate(hoy.getDate() + 1);

        // Guardar la solicitud en la tabla BookRequest
        const bookRequest = await prismaAdmin.create({
          data: {
            bookId: id_libro,
            userid: id_usuario,
            aceptado: false,
            fechaRecoger: futuro,
          },
        });

        res.status(200).json({
          message: "Libro solicitado exitosamente",
          solicitud: bookRequest.id_request,
          IdLibro: book.id_libro,
          usuario: user.id_usuario,
          fechaRecoger: futuro,
        });
      }
      if (pago === 'tarjeta'){
        // Obtener la fecha actual
      const hoy = new Date();

      // Sumar 1 día a la fecha actual
      const futuro = new Date(hoy);
      futuro.setDate(hoy.getDate() + 1);

      // Guardar la solicitud en la tabla BookRequest
      const bookRequest = await prismaAdmin.create({
        data: {
          bookId: id_libro,
          userid: id_usuario,
          aceptado: true,
          fechaRecoger: hoy,
        },
      });
    
      res.status(200).json({
        message: "Libro solicitado exitosamente",
        solicitud: bookRequest.id_request,
        IdLibro: book.id_libro,
        usuario: user.id_usuario,
        fechaRecoger: hoy,
      });
    }

      
    } else {
      res.status(404).json("Libro sin existencias");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Hubo un error, pruebe más tarde",
    });
  }
};

export const declineRequest = async (req, res) => {
  const requestId = parseInt(req.params.id);

  try {
    const request = await prismaAdmin.findUnique({
      relationLoadStrategy: "join", 
      include: {
        book: true,
      },
      where: {
        id_request: requestId,
      },
    });

    if (!request) {
      return res.status(404).json({
        message: "La solicitud no fue encontrada",
      });
    }

    console.log(request);

    const updatedBook = await prisma.update({
      where: {
        id_libro: request.book.id_libro,
      },
      data: {
        cantidad: request.book.cantidad + 1,
        cantidadVendidos: request.book.cantidadVendidos - 1,
      },
    });

    await prismaAdmin.delete({
      where: {
        id_request: requestId,
      },
    });
    res
      .status(200)
      .json({
        message: `La solicitud ha sido eliminado correctamente`,
      })
      .end();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Hubo un error, pruebe más tarde",
    });
  }
};

export const acceptRequest = async (req, res) => {
  const requestId = parseInt(req.params.id);

  try {
    const request = await prismaAdmin.findUnique({
      where: {
        id_request: requestId,
      },
    });

    if (!request) {
      return res.status(404).json({
        message: "La solicitud no fue encontrada",
      });
    }

    // Obtener la fecha actual
    const hoy = new Date();

    // Guardar la solicitud en la tabla BookRequest
    const bookRequest = await prismaAdmin.update({
      where: {
        id_request: requestId,
      },
      data: {
        aceptado: true,
        fechaEntrega: hoy,
      },
    });

    res.status(200).json({
      message: "Libro entregado exitosamente",
      solicitud: requestId,
      fechaEntrega: hoy,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Hubo un error, pruebe más tarde",
    });
  }
};

export const deleteBookCopy = async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const book = await prisma.findUnique({
      where: {
        id_libro: bookId,
      },
    });

    if (!book) {
      res.status(404).json({
        error: "El libro no fue encontrado",
      });
      return;
    }

    if (book.cantidad != 0) {
      const updatedBook = await prisma.update({
        where: {
          id_libro: bookId,
        },
        data: {
          cantidad: book.cantidad - 1,
        },
      });

      res.status(200).json(updatedBook);
    } else {
      res.status(404).json("Libro sin existencias");
    }
  } catch (error) {
    if (error?.code === "P2025") {
      res.status(404).json("Libro no encontrado");
    } else {
      console.log(error);
      res.status(500).json({
        error: "Hubo un error, pruebe mas tarde",
      });
    }
  }
};

export const addBookCopy = async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const book = await prisma.findUnique({
      where: {
        id_libro: bookId,
      },
    });

    if (!book) {
      res.status(404).json({
        error: "El libro no fue encontrado",
      });
      return;
    }

    const updatedBook = await prisma.update({
      where: {
        id_libro: bookId,
      },
      data: {
        cantidad: book.cantidad + 1,
      },
    });

    res.status(200).json(updatedBook);
  } catch (error) {
    if (error?.code === "P2025") {
      res.status(404).json("Libro no encontrado");
    } else {
      console.log(error);
      res.status(500).json({
        error: "Hubo un error, pruebe mas tarde",
      });
    }
  }
};
