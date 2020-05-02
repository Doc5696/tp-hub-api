const usersRoutes = require('./routes.users')

module.exports = function(app, client) {
  usersRoutes(app, client)
}
