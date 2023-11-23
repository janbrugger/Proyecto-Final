const express = require("express");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "CLAVE SECRETA"
const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const categoryProductRouter = require("./routes/categoryProductRouter");
const productsRouter = require("./routes/productsRouter");
const commentsRouter = require("./routes/commentsRouter");

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static("public"));

// Auth
app.post("/login", (req,res)=>{
  const {username, password} = req.body;

  if(username ==="admin@email.com" && password === "admin"){
    const token = jwt.sign({username}, SECRET_KEY);
    res.status(200).json({token});
    console.log("entro")
  }else{
    res.status(401).json({messaje: "Usuario y/o contraseña incorrecta"});
  }
})


// Middleware que autoriza a realizar peticiones a /api/categories
app.use("/api/categories", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});
//----

// Middleware que autoriza a realizar peticiones a /api/categories_products
app.use("/api/categories_products", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY);
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});
//----


app.use("/api/users", userRouter); //users

app.use("/api/categories", categoryRouter); //categorias

app.use("/api/categories_products", categoryProductRouter); //productos segun la categoria

app.use("/api/products", productsRouter); //detalles de cada producto

app.use("/api/products_comments", commentsRouter); //comentarios de cada producto


app.listen(port, () => {
  console.log(`Servidor corriendo en http:localhost:${port}`);
});

