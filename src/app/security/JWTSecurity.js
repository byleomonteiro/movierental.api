const jwt = require("jsonwebtoken")

const authConfig = require("../../config/auth")

const User = require("../models/User")

const model = new User()

module.exports = {
    async sign(user) {
        const { id } = user

        try {
          const now = new Date()

          const token = jwt.sign(
            {
              data: id,
              exp: new Date(now.setHours(now.getHours() + 2)).getTime()
            },
            authConfig.secret,
          );

          if (!token) {
            return {
              error: true,
              message: "Error generating token, try again."
            };
          }

          return {
            error: false,
            message: "token generated successfully",
            token
          };
      } catch (error) {
          return {
            error: true,
            message: error
          };
      }
    },

    async verify(headers) {

      if (!headers || !headers.authorization)
      return {
        error: true,
        valid: false,
        message: "You must be logged in to access this endpoint"
      };
      
      try {
        const token = headers.authorization.replace("Bearer ", "");


        const decoded = jwt.verify(token, authConfig.secret);

        if (!decoded)
          return {
            error: true,
            valid: false,
            message: "Invalid token"
          };
          

        const now = new Date().getTime()

        if (now > decoded.exp)
          return {
            error: true,
            valid: false,
            message: "Token expired"
          };

    
        const user = await model.findOne(decoded.data)
    
        if(!user) return {
          error: true,
          valid: false,
          message: "User invalid"
        }
    
        return {
          error: false,
          valid: true,
          message: "Token validated successfully",
          user,
        };
      } catch (err) {
        return {
          error: true,
          valid: false,
          ...err
        };
      }
    }
}