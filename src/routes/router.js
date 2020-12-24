const { Router } = require("express")

const AuthController = require("../app/controllers/AuthController")
const UserController = require("../app/controllers/UserController")
const MovieController = require("../app/controllers/MovieController")
const RentalController = require("../app/controllers/RentalController")

const requireLogin = require("../app/middlewares/requireLogin")

const routes = Router()
// SESSIONS
routes.post("/users/login", AuthController.login)

// USERS
routes.post("/users", UserController.create)
routes.get("/users", requireLogin, UserController.index)
routes.delete("/users/:userId", requireLogin, UserController.delete)

// MOVIES
routes.post("/movies", requireLogin, MovieController.create)
routes.put("/movies/:movieId", requireLogin, MovieController.update)
routes.get("/movies", requireLogin, MovieController.index)
routes.delete("/movies/:movieId", requireLogin, MovieController.delete)

// RENTALS
routes.post("/movies/rent/:movieId", requireLogin, RentalController.create)
routes.put("/movies/return/:movieId", requireLogin, RentalController.update)
routes.get("/rentals", requireLogin, RentalController.index)

module.exports = routes