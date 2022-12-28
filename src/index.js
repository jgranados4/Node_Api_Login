const express = require("express");
const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//rutas😎
const Route = app.use(require("./router/Rutas"));

//llamadas
app.listen(app.get("port"), () => {
  console.log(`Este Servidor 😎esta en el puerto${app.get("port")}`);
});
