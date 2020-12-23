import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import img from '../images/sample-1.jpg';

export const QuestionCard = ({ quest }) => {
  const { request } = useHttp();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [answer, setAnswer] = useState(0);
  const cnOption = quest.members.length > 0 ? 'black-text' : '';
  const cnCard =
    quest.members.length === 0
      ? 'card question-card'
      : quest.members[0].isSuccessfully
      ? 'card question-card teal accent-3'
      : 'card question-card amber darken-4';

  const changeHandler = (num) => () => {
    setAnswer(num);
  };

  const submitHandler = async (e) => {
    const success = answer === quest.answer;

    try {
      await request(
        '/api/question/change',
        'POST',
        { id: quest._id, success },
        { Authorization: `Bearer ${auth.token}` }
      );

      history.push(`/result/${quest._id}`);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s12 m8 xl6 offset-m2 offset-xl3">
        <div className={cnCard}>
          <div className="card-image">
            <img src={img} alt="question" />
          </div>
          <div className="card-content">
            <p>{quest.question}</p>
          </div>
          <div className="card-action">
            <form action="#">
              <p>
                <label>
                  <input
                    className="with-gap"
                    name="group1"
                    type="radio"
                    onChange={changeHandler(1)}
                  />
                  <span className={cnOption}>{quest.options[1]}</span>
                </label>
              </p>
              <p>
                <label>
                  <input
                    className="with-gap"
                    name="group1"
                    type="radio"
                    onChange={changeHandler(2)}
                  />
                  <span className={cnOption}>{quest.options[2]}</span>
                </label>
              </p>
              <p>
                <label>
                  <input
                    className="with-gap"
                    name="group1"
                    type="radio"
                    onChange={changeHandler(3)}
                  />
                  <span className={cnOption}>{quest.options[3]}</span>
                </label>
              </p>
              <p>
                <label>
                  <input
                    className="with-gap"
                    name="group1"
                    type="radio"
                    onChange={changeHandler(4)}
                  />
                  <span className={cnOption}>{quest.options[4]}</span>
                </label>
              </p>
            </form>

            {!quest.members.length && (
              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
                onClick={submitHandler}
              >
                Ответить
                <i className="material-icons right">send</i>
              </button>
            )}

            {quest.members.length > 0 && (
              <p className="flow-text">
                <small>
                  Правильный ответ: <span className="flow-text">{quest.options[quest.answer]}</span>
                </small>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
