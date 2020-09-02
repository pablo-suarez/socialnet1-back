const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keymon");
const mongoose = require("mongoose");
const User = mongoose.model("User");

/***
 * Authorization Verifica que el usuario este logeado
 * Authorization  Check if user is logged
 */
module.exports = (req, res, next) => {
  /***
   * Obtiene los datos de authorization
   * Get Authorization data
   */
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Debes estar logeado" });
  }
  /***
   * Obtiene solo el token de Authorization
   * Get only the Authorization token
   */
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "Debes estar logeado" });
    }
    /***
     * Obtiene los datos del usuario loggeado
     * Get the logged user data
     */
    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
    //next()
  });
};
