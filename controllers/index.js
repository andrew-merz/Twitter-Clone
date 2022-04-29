require("../config/db.connection");

module.exports = {
  auth: require("./auth_controller"),
  home: require("./home_controller"),
};
