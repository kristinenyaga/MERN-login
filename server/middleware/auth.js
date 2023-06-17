import env from "../config.js";
import jwt from "jsonwebtoken";
export default async function Auth(req, res, next) {
  try {
    // access authorize header to validate request
      const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
        // retrieve the user details fo the logged in user
    const user = await jwt.verify(token, env.JWT_SECRET)
    req.user = user
    next()
  }
  catch (error) {
    res.status(401).json({error:"you are not authorized"})
  }
}