import React, { useState, useEffect, useContext } from 'react';
import { useMessage } from '../hooks/message.hook';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, error, clearError, request } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  const pressHandler = (event) => {
    if (event.key === 'Enter') {
      loginHandler();
    }
  };

  return (
    <div className="row">
      <form className="col s12 m8 l6 offset-m2 offset-l3">
        <h1>QR Quest</h1>

        <div className="card orange">
          <div className="card-content ">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="validate"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="validate"
                  value={form.password}
                  onChange={changeHandler}
                  onKeyPress={pressHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button className="btn grey darken-3" onClick={loginHandler} disabled={loading}>
              Войти
            </button>
            <button
              className="btn grey lighten-3 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
