const { Router } = require("express")
const swaggerUi = require("swagger-ui-express")

const swaggerDocument = require("../docs/swagger.json")

const AuthController = require("../app/controllers/AuthController")
const UserController = require("../app/controllers/UserController")
const MovieController = require("../app/controllers/MovieController")
const RentalController = require("../app/controllers/RentalController")

const requireLogin = require("../app/middlewares/requireLogin")

const routes = Router()

// DOCS
routes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// SESSIONS
routes.post("/users/login", AuthController.login)


// USERS
routes.post("/users", UserController.create)
routes.get("/users", UserController.index)
routes.get("/users/:userId", UserController.show)
routes.delete("/users/:userId", requireLogin, UserController.delete)

// MOVIES
routes.post("/movies", MovieController.create)
routes.put("/movies/:movieId", MovieController.update)
routes.get("/movies", MovieController.index)
routes.get("/movies/:movieId", MovieController.show)
routes.delete("/movies/:movieId", requireLogin, MovieController.delete)

// RENTALS
routes.post("/movies/rent/:movieId", requireLogin, RentalController.create)
routes.put("/movies/return/:movieId", requireLogin, RentalController.update)
routes.get("/rentals", requireLogin, RentalController.index)

module.exports = routes