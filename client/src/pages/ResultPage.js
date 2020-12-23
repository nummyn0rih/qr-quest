import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/Loader';

export const ResultPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [question, setQuestion] = useState(null);
  const [successful, setSuccessful] = useState(null);
  const questionId = useParams().id;

  useEffect(() => {
    (async () => {
      try {
        const fetched = await request(`/api/question/${questionId}`, 'GET', null, {
          Authorization: `Bearer ${token}`,
        });

        setQuestion(fetched);
        setSuccessful(fetched.members[0].isSuccessfully);
      } catch (e) {}
    })();
  }, [token, questionId, request]);

  if (loading) {
    return <Loader />;
  }

  return (
    !loading &&
    question && (
      <div className="row">
        <div className="col s12 m8 l6 offset-m2 offset-l3">
          <h1>
            <small></small>
          </h1>

          <div className={successful ? 'card teal accent-3' : 'card amber darken-4'}>
            <div className="card-content">
              <span className="card-title flow-text">
                Это {successful ? 'правильный' : 'неправильный'} ответ
              </span>
              {!successful && (
                <p className="flow-text">
                  <small>
                    Правильный ответ:{' '}
                    <span className="flow-text">{question.options[question.answer]}</span>
                  </small>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};
