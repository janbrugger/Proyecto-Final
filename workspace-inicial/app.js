const express = require("express");

const app = express();
const port = 3000;

const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const categoryProductRouter = require("./routes/categoryProductRouter");
const productsRouter = require("./routes/productsRouter");
const commentsRouter = require("./routes/commentsRouter");

app.use(express.json());

app.use(express.static("public"));

app.use("/api/users", userRouter); //users

app.use("/api/categories", categoryRouter); //categorias

app.use("/api/categories_products", categoryProductRouter); //productos segun la categoria

app.use("/api/products", productsRouter); //detalles de cada producto

app.use("/api/products_comments", commentsRouter); //comentarios de cada producto

app.listen(port, () => {
  console.log(`Servidor corriendo en http:localhost:${port}`);
});

