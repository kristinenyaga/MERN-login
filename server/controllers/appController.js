import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";

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
        res.status(500).send({ error: `Error occurred: ${error.message}` });
      });
  } catch (error) {
    res.status(500).send({ error: "An error occurred" });
  }
}

export async function login(req, res) {
  const { username, password } = req.body
  try {
    userModel.findOne({ username })
      // if it returns result promise we get it inside then
      .then(user => {
        bcrypt.compare(password,user.password)
 
        .theb
      })
      // if there is an error we handle it with the catch method
      .catch(err => { return res.status(404).send({error:"Username not found"}) })
    
  } catch (error) {
    res.status(500).send({ error: "An error occurred" });
  }
}

export async function getUser(req, res) {
  res.json("getuser");
}

//put

export async function updateuser(req, res) {
  res.json("updateuser");
}

export async function generateOTP(req, res) {
  res.json("generate otp");
}

export async function verifyOTP(req, res) {
  res.json("verify otp");
}

// successfully redirect the user when the OTP IS valid

export async function createResetSession(req, res) {
  res.json("create");
}

// put
export async function resetPassword(req, res) {
  res.json("reset pass");
}
