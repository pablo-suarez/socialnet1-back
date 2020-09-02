const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const { MDBURI } = require("./keymon.js");

/***
 * Para conectar a la base de datos AtlasM0ongo crear un archivo en el directorio principal
 *  llamado keymon.js o con el nombre que se ponga enconst {MDBURI} = require('./keymon.js')
 * Agregarle lo siguiente:
 module.exports={
    MDBURI: "enlace brindado por atalasmongodb para conexion",
    JWT_SECRET:"Token JWT"
}


To connect to AtlasMongoDB create a new file named keymon.js of however is named in const {MDBURI} = require('./keymon.js')   
in the main directory and add next:
 * 
  module.exports={
    MDBURI: "link from AtlasMongoDB to connection",
    JWT_SECRET:"Token JWT"
}
 */

/**
 * Envia credenciales para conexión
 * Send credentials to connection
 */
mongoose.connect(MDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/**
 * Obtiene los resultados de la conexión si es exitosa
 * Get the connection results if its success
 */
mongoose.connection.on("connected", () => {
  console.log("Conection to MongoDB Atlas succesful");
});

/**
 * Obtiene los resultados de la conexión si falla
 * Get the connection results if it fails
 */
mongoose.connection.on("error", (err) => {
  console.log("Conection to MongoDB Atlas fail", err);
});

/**
 * Modelos de la base de datos requeridos
 * Required dabatase models
 */
require("./models/user");
require("./models/post");

/**
 * Rutas para administrar los datos en la base de datos
 * Routes to manage data in database
 */
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

app.get("/", (req, res) => {
  res.send("hello");
});

/**
 * Muestra los detalles de la conexión
 * Show connection details
 */
app.listen(PORT, () => {
  console.log("server running in port ", PORT);
});
