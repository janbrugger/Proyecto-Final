const express = require("express");

const app = express();
const port = 3000;

const userRouter = require("./routes/userRouter");

const autosRouter = require("./routes/autosRouter");

app.use(express.json());

app.use(express.static("public"));

app.use("/api/users", userRouter); //categorias

app.use("/api/autos", autosRouter); //autos

app.listen(port, () => {
  console.log(`Servidor corriendo en http:localhost:${port}`);
});

