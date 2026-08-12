import { useCallback, useState } from 'react';

export function useFormAndValidation(initialState = {}) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = true) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  });

  return { values, handleChange, resetForm, errors, isValid, setValues, setIsValid };
}
