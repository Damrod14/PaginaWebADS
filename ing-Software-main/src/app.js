import express from "express";
import bodyParser from "body-parser";
import "dotenv/config.js";
import { userRoutes } from "./routes/userRoutes.js";

//Usamos express para los middlewares
const app = express();
app.use(bodyParser.json()); //Parseador de bodies

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hola mundo!");
});

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
