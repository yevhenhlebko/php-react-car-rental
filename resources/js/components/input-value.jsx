import { useState, useCallback } from "react";

function InputValue(field) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const onChange = useCallback((event) => {
    setValue(event.currentTarget.value);
    setError("");
  }, []);

  const parseServerError = (errors) => {
    if (errors && errors[field]) {
      setError(errors[field][0]);
    }
  };

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange,
    },
    error,
    setError,
    parseServerError,
  };
}

export default InputValue;
