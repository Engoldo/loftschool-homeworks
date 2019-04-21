import React, { useState } from 'react';
import bondImg from './assets/bond_approve.jpg';
import './Form.css';

const Form = () => {
  const [propsFields, setPropsFields] = useState({
    values: {
      firstname: '',
      lastname: '',
      password: ''
    },

    errors: {
      firstname: '',
      lastname: '',
      password: ''
    }
  });

  const [submit, setSubmit] = useState(false);

  const { values, errors } = propsFields;

  const handleSubmit = e => {
    e.preventDefault();
    if (validation() === false) {
      setSubmit(true);
    }
  };

  const handleChange = e => {
    const clearErrors = Object.keys(errors).reduce((object, key) => {
      object[key] = '';
      return object;
    }, {});

    const { name, value } = e.target;
    setPropsFields(propsFields => ({
      ...propsFields,
      errors: { ...clearErrors },
      values: { ...propsFields.values, [name]: value }
    }));
  };

  const validation = () => {
    let firstname = '';
    let lastname = '';
    let password = '';

    let hasError = false;

    if (!values.firstname) {
      hasError = true;
      firstname = 'Нужно указать имя';
    }

    if (values.firstname && values.firstname !== 'james') {
      hasError = true;
      firstname = 'Имя указано не верно';
    }

    if (!values.lastname) {
      hasError = true;
      lastname = 'Нужно указать фамилию';
    }

    if (values.lastname && values.lastname !== 'bond') {
      hasError = true;
      lastname = 'Фамилия указана неверно';
    }

    if (!values.password) {
      hasError = true;
      password = 'Нужно указать пароль';
    }

    if (values.password && values.password !== '007') {
      hasError = true;
      password = 'Пароль указан неверно';
    }

    setPropsFields(fieldsProps => ({
      ...fieldsProps,
      errors: { firstname: firstname, lastname: lastname, password: password }
    }));

    return hasError;
  };

  return (
    <div className="app-container">
      {submit ? (
        <img src={bondImg} alt="bond approve" className="t-bond-image" />
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <h1>Введите свои данные, агент</h1>

          <p className="field">
            <label className="field__label" htmlFor="firstname">
              <span className="field-label">Имя</span>
            </label>
            <input
              className="field__input field-input t-input-firstname"
              type="text"
              name="firstname"
              value={values.firstname}
              onChange={handleChange}
            />
            <span className="field__error field-error t-error-firstname">
              {errors.firstname}
            </span>
          </p>

          <p className="field">
            <label className="field__label" htmlFor="lastname">
              <span className="field-label">Фамилия</span>
            </label>
            <input
              className="field__input field-input t-input-firstname"
              type="text"
              name="lastname"
              value={values.lastname}
              onChange={handleChange}
            />
            <span className="field__error field-error t-error-lastname">
              {errors.lastname}
            </span>
          </p>

          <p className="field">
            <label className="field__label" htmlFor="password">
              <span className="field-label">Пароль</span>
            </label>
            <input
              className="field__input field-input t-input-password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            <span className="field__error field-error t-error-password">
              {errors.password}
            </span>
          </p>

          <div className="form__buttons">
            <input
              type="submit"
              className="button t-submit"
              value="Проверить"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Form;
