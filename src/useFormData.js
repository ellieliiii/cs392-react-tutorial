import { useState } from 'react';

/**
 * Custom hook for managing form data and validations.
 * @param {Object} initialValues - Initial values of the form fields.
 * @param {Function} validate - Function to validate form data.
 * @returns {Object} - Form state and handlers.
 */
const useFormData = (initialValues, validate) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  /**
   * Handles input changes.
   * @param {Object} e - Event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Validates the form data.
   * @returns {boolean} - Whether the form data is valid.
   */
  const handleValidate = () => {
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return {
    formData,
    errors,
    handleChange,
    handleValidate,
    setFormData, // Exposed in case manual updates are needed
    setErrors,    // Exposed for manual error setting
  };
};

export default useFormData;
