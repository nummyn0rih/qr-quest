import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { QuestionCard } from '../components/QuestionCard';
import { Loader } from '../components/Loader';

export const DetailPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [question, setQuestion] = useState(null);
  const questionId = useParams().id;

  useEffect(() => {
    (async () => {
      try {
        const fetched = await request(`/api/question/${questionId}`, 'GET', null, {
          Authorization: `Bearer ${token}`,
        });
        setQuestion(fetched);
      } catch (e) {}
    })();
  }, [token, questionId, request]);

  if (loading) {
    return <Loader />;
  }

  return !loading && question && <QuestionCard quest={question} />;
};
