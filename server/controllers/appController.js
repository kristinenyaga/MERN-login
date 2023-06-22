import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import env from "../config.js"
import otpGenerator from "otp-generator";

/** middleware for verifying a user */
export async function verifyUser(req, res, next){
    try {
        
        const { username } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        let exist = await userModel.findOne({ username });
        if(!exist) return res.status(404).send({ error : "Can't find User!"});
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error"});
    }
}


export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    // Check if user exists
    const existUsername = userModel.findOne({ username }).exec();
    const existEmail = userModel.findOne({ email }).exec();

    Promise.all([existUsername, existEmail])
      .then(([usernameResult, emailResult]) => {
        if (usernameResult) {
          throw new Error("Please use a unique username");
        }
        if (emailResult) {
          throw new Error("Please use a unique email");
        }

        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedpassword) => {
              const user = new userModel({
                username,
                email,
                password: hashedpassword,
                profile: profile || "",
              });
              return user.save();
            })
            .then(() =>
              res.status(200).send({ msg: "User registered successfully" })
            )
            .catch((error) => {
              res.status(500).send({ error: `Error saving user: ${error}` });
            });
        }
      })
      .catch((error) => {
        res.status(500).send({ error: `${error.message}` });
      });
  } catch (error) {
    res.status(500).send({ error: "An error occurred" });
  }
}

/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req, res) {
  const { username, password } = req.body
  try {
    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(404).send({ error: "Username not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).send({ error: "Invalid password" });
    }

    // Password is correct, generate JWT token
    const token = jwt.sign({ userId:user._id,username: user.username }, env.JWT_SECRET,{expiresIn:"24h"});

    // Send the token as a response
    return res.status(200).send({
      msg: "login successful",
      token,
      username:user.username
    });

    // Password is correct, proceed with further actions
    // ...
  } catch (error) {
    res.status(500).send({ error: "An error occurred" });
  }
}

/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {
  const { username } = req.params;

  if (username) {
      try {
        const user = await userModel.findOne({ username }).select("-password");

        if (user) {
          // User found
          return res.status(200).send({ user });
        } else {
          // User not found
          return res.status(404).send({ error: "User not found" });
        }
      } catch (error) {
        // Error occurred during the database query
        return res.status(500).send({ error: "An error occurred" });
      }
    
  }
  else
  return res.status(400).send({error:"Please provide a user name"})

}


// //put
// req.query: It represents the query parameters in the URL. Query parameters are additional information appended to the URL and are separated by ? followed by key-value pairs.

// we only want to allow the authorized user to update their profile
/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req, res) {
  try {
    // const  id  = req.query.id;
    const { userId } = req.user
    
    console.log(userId)

    if (!userId) {
      return res.status(401).send({ error: "User not found" });
    }

    const body = req.body;

    // The new: true option is provided as a third argument to findByIdAndUpdate() to return the updated user document. This ensures that the updatedUser variable contains the latest user data.
    const updatedUser = await userModel.findByIdAndUpdate(userId, body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).send({ error: "User not found" });
    }

    return res.status(201).send({ msg: "Record updated successfully", updateUser });

        
  } catch (error) {
    return res.status(500).send({ error: "An error occurred",error });
  }
}
/** GET: http://localhost:8080/api/verifyOTP */
export async function generateOTP(req, res) {
  req.app.locals.OTP = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
  res.status(201).send({code:req.app.locals.OTP})
}
// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function verifyOTP(req, res) {
  const { code } = req.query
  console.log(code,req.app.locals.OTP)
  if (parseInt(code) === parseInt(req.app.locals.OTP)) {
    req.app.locals.OTP = null //reset OTP value
    req.app.locals.resetSession = true //start session for reset password
    return res.status(201).send({ msg: "Verified Successsfully!" });
  }
  return res.status(400).send({ error: "Invalid OTP" });
}

// successfully redirect the user when the OTP IS valid

export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    // req.app.locals.resetSession = false //allow access to this route only once
    return res.status(201).send({ flag: req.app.locals.resetSession });
  }
  return res.status(440).send({error:"Session expired"})
}

// put
// The updateOne function is used to update the user's password in the database. It takes two parameters: a query object to identify the user (in this case, based on the username), and an update object to specify the fields to be updated (in this case, setting the password to the hashed password).

export async function resetPassword(req, res) {
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).send({ error: "Session expired!" });

    const { username, password } = req.body;

    try {
      const user = await userModel.findOne({ username });

      if (!user) {
        return res.status(404).send({ error: "Username not found" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await userModel.updateOne(
        { username: user.username },
        { password: hashedPassword }
      );

      req.app.locals.resetSession = false; // reset session

      return res.status(201).send({ msg: "Record Updated...!" });
    } catch (error) {
      return res.status(500).send({ error: "Failed to update password" });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}

