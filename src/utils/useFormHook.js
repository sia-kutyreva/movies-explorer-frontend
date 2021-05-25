import React, { useCallback, useState } from "react";
import validator from 'validator';

export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [emailError, setEmailError] = useState('');

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (name === 'email') {
      if (validator.isEmail(value)) {
        setEmailError('');
        setValues({...values, [name]: value});
        setIsValid(true);
        setErrors({...errors, [name]: emailError });
      } else {
        setEmailError('Enter valid Email!')
        setValues({...values, [name]: value});
        setIsValid(false);
        setErrors({...errors, [name]: emailError });
      }
    } else {
      setValues({...values, [name]: value});
      setErrors({...errors, [name]: target.validationMessage });
      setIsValid(target.closest("form").checkValidity());
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm, setValues };
}
