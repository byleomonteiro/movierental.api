"use strict"

require("dotenv/config")
require("./database")
require("express-async-errors")

const express = require("express")
const helmet = require("helmet")

const router = require("./routes/router")

class App {
    constructor(){
        this.server = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(express.json())
        this.server.use(helmet())
    }

    routes() {
        this.server.use("/v1", router)
    }
}

module.exports = new App().server



