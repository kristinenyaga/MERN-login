import toast from 'react-hot-toast'

// validate login pageusername
export  const usernameValidate = async (values) => {
  const errors = usernameVerify({}, values)
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
  const errors = usernameValidate({}, values)
  passwordValidate(errors, values)
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