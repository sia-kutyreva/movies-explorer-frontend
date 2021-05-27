import { useState } from "react";
import validator from 'validator'

export function useEmailValidation() {

  const [emailError, setEmailError] = useState('')

  const validateEmail = (e) => {
    const email = e.target.value;
  
    if (validator.isEmail(email)) {
      setEmailError('Valid Email :)')
    } else {
      setEmailError('Enter valid Email!')
    }
  }

  return { emailError, validateEmail };
}
