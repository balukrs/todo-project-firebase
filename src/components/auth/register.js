import React, { useState, useEffect } from "react";
import styles from "./auth.module.scss";
import { useForm, useField } from "react-final-form-hooks";

const Registeruser = ({ reg, stats }) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (stats === true) {
      setStatus(styles.reg__form);
    } else setStatus("");
  }, [stats]);

  const onSubmit = async (values, form) => {
    const email = values.EmailId;
    const password = values.Password;
    reg(email, password);
    form.restart();
  };

  const validate = (values) => {
    const errors = {};

    if (!values.EmailId) {
      errors.EmailId = "Required";
    }
    if (!values.Password) {
      errors.Password = "Required";
    }

    return errors;
  };

  const { form, handleSubmit, submitting } = useForm({
    onSubmit,
    validate,
  });

  const EmailId = useField("EmailId", form);
  const Password = useField("Password", form);

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.general__form} ${status}`}
    >
      <div className={styles.input__cont}>
        <input
          className={styles.input__prime}
          autoComplete="off"
          placeholder={`Enter new Email Id`}
          {...EmailId.input}
        />
        {EmailId.meta.touched && EmailId.meta.error && (
          <span className={styles.form__error}>{EmailId.meta.error}</span>
        )}
      </div>
      <div className={styles.input__cont}>
        <input
          className={styles.input__prime}
          type="password"
          autoComplete="off"
          placeholder={`Enter new Password`}
          {...Password.input}
        />
        {Password.meta.touched && Password.meta.error && (
          <span className={styles.form__error}>{Password.meta.error}</span>
        )}
      </div>

      <button type="submit" disabled={submitting} className={styles.small__btn}>
        Register
      </button>
    </form>
  );
};

export default Registeruser;
