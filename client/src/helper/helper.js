import axios from 'axios'
import jwt_decode from "jwt-decode";
axios.defaults.baseURL = "http://localhost:8080";

/** To get username from Token */
export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
  let decode = jwt_decode(token)
  console.log(decode.username)
    return decode;
}

export const authenticate = async (username) => {
  try {
    return await axios.post("/api/auth",{username})
    
  } catch (error) {
    
    return {error:"username doesn't exist"}
  }
}

export const getUser = async ({username}) => {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return data.user
  } catch (error) {
    return { error: "username doesn't exist" };
  }

};

export const registerUser = async (credentials) => {
  try {
    const { data:{msg}, status } = await axios.post("/api/register", credentials);
    let { username, email } = credentials
    // send user an email
    if (status === 201) {
      await axios.post('/api/registerMail',{username,userEmail:email,text:msg})
    }
   return Promise.resolve(msg);
  } catch (error) {
    return Promise.reject({ error });
  }
};

export const login = async ({username,password}) => {
  try {
    if (username) {
      const { data } = await axios.post("/api/login", {
        username,
        password
      });
     return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesn't Match...!" });
  }
};

export const updateUser = async (response) => {
  try {
    const token = await localStorage.getItem('token')
    const data = await axios.put("/api/updateuser", response, { headers: { "Authorization": `Bearer ${token}` } });
    return Promise.resolve({ data });
  } catch (error) {
   return Promise.reject({ error: "Couldn't Update Profile...!" });
  }
};

export const generateOTP = async (username) => {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/generateOTP", { params: { username } });
    // send mail with otp
    if (status === 201) {
      let data  = await getUser({username} )
      let text = `your password recovery OTP is ${code}. verify and recover your password`
      await axios.post(`/api/registerMail`, { username, userEmail: data.email, text, subject: "Password recovery OTP" })

      return Promise.resolve(code);
    }
    
  } catch (error) {
   return Promise.reject({ error });
  }
};

export const verifyOTP = async ({username,code}) => {
  try {
    const {data,status } = await axios.get("/api/verifyOTP", {
      params: { username, code },
    });
    return {data,status}
  } catch (error) {
    return Promise.reject({ error: "Couldn't verify OTP...!" });
  }
};

export const resetPassword = async ({ username, password }) => {
  try {
    const { data, status } = await axios.put("/api/resetPassword",{ username, password });
    return  Promise.resolve( { data, status });
  } catch (error) {
    return Promise.reject({ error: "Couldn't update password...!" });
  }
};
