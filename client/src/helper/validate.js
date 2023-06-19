import toast from 'react-hot-toast'
import { authenticate } from '../helper/helper.js'
import { login } from '../helper/helper.js'

// validate login pageusername

export  const usernameValidate = async (values) => {
  const errors = usernameVerify({}, values)
  if (values.username) {
    const { status } = await authenticate(values.username)
    
    if (status !== 200) {
      errors.exist = toast.error('user does not exist')
    }
    else {
      toast.success("user does  exist");
    }
  }
  return errors
}

// validate login pagepassword
export  const passwordValidate = async (values) => {
  const errors = passwordVerify({}, values)
  return errors
}
// validate login resetpassword
export  const resetpasswordValidate = async (values) => {
  const errors = passwordVerify({}, values)
  if (values.password !== values.confirmpassword) {
    errors.exist = toast.error("Passwords do not match!")
  }
  return errors
}
// validate register
export  const registerValidate = async (values) => {
  const errors = usernameVerify({}, values)
  passwordVerify(errors, values)
  emailVerify(errors,values)
  return errors
}

export const profileValidate = async (values) => {
  const errors = emailVerify({}, values);
  return errors;
};
// validate username

const usernameVerify = (errors = {}, values) => {
  if (!values.username) {
    errors.username = toast.error("Username Required")
  }
  else if (values.username.includes(" ")) {
    errors.username = toast.error("Invalid Username");
    
  }
  return errors
}

// validate password

const passwordVerify = (errors = {}, values) => {
  const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!values.password) {
      errors.password = toast.error("Password Required");
    } else if (values.password.includes(" ")) {
      errors.password = toast.error("Wrong Password");
    } else if (values.password.length< 6) {
      errors.password = toast.error("Password must be more than 6 characters");
    }
    else if (!regex.test(values.password)) {
      errors.password = toast.error("Password must include special characters");
    }
  return errors
}
//validate email
const emailVerify = (errors = {}, values) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email) {
    errors.email = toast.error("Email Required");
  } else if (values.username.includes(" ")) {
    errors.email = toast.error("Invalid Email");
  }
  else if (!regex.test(values.email)) {
    errors.email = toast.error("Provide a valid email address")
  }
  return errors;
};