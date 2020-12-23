import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import M from 'materialize-css';

export const CreatePage = () => {
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState({});
  const [answer, setAnswer] = useState('');

  const changeHandler = (e) => {
    setOptions({ ...options, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    try {
      const data = await request(
        '/api/question/generate',
        'POST',
        { question, options, answer },
        { Authorization: `Bearer ${auth.token}` }
      );
      history.push(`/detail/${data.quest._id}`);
    } catch (e) {}
  };

  useEffect(() => {
    M.AutoInit();
    M.updateTextFields();
  }, []);

  return (
    <div className="row">
      <div className="col s12 m8 l6 offset-m2 offset-l3">
        <h1>
          <small>Добавить вопрос</small>
        </h1>

        <div className="card amber darken-2">
          <div className="card-content">
            <div className="file-field input-field">
              <div className="btn">
                <span>File</span>
                <input type="file" />
              </div>
              <div className="file-path-wrapper">
                <input
                  className="file-path validate"
                  type="text"
                  placeholder="Выберите изображение"
                />
              </div>
            </div>

            <div className="input-field">
              <textarea
                id="textarea1"
                className="materialize-textarea"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              ></textarea>
              <label htmlFor="textarea1">Вопрос</label>
            </div>

            <span className="card-title">
              <small>Варианты ответов</small>
            </span>

            <div className="input-field">
              <span className="prefix">
                <small>1</small>
              </span>
              <input
                id="option-1"
                type="text"
                className="validate"
                name="1"
                onChange={changeHandler}
              />
            </div>

            <div className="input-field">
              <span className="prefix">
                <small>2</small>
              </span>
              <input
                id="option-2"
                type="text"
                className="validate"
                name="2"
                onChange={changeHandler}
              />
            </div>

            <div className="input-field">
              <span className="prefix">
                <small>3</small>
              </span>
              <input
                id="option-3"
                type="text"
                className="validate"
                name="3"
                onChange={changeHandler}
              />
            </div>

            <div className="input-field">
              <span className="prefix">
                <small>4</small>
              </span>
              <input
                id="option-4"
                type="text"
                className="validate"
                name="4"
                onChange={changeHandler}
              />
            </div>

            <div className="input-field">
              <select value={answer} onChange={(e) => setAnswer(e.target.value)}>
                <option value="" disabled>
                  Выберите правильный ответ
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <label>Правильный ответ</label>
            </div>

            {question && options && answer && (
              <button className="waves-effect waves-light btn-large" onClick={submitHandler}>
                <i className="material-icons right">add_circle</i>Добавить
              </button>
            )}
            {/* onClick={loginHandler} disabled={loading} */}
          </div>
        </div>
      </div>
    </div>
  );
};
