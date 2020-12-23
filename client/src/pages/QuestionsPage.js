import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/Loader';
import { ResultList } from '../components/ResultList';

export const QuestionsPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const fetched = await request(`/api/question`, 'GET', null, {
          Authorization: `Bearer ${token}`,
        });
        setQuestions(fetched);
      } catch (e) {}
    })();
  }, [token, request]);

  if (loading) {
    return <Loader />;
  }

  return !loading && <ResultList questions={questions} />;
};
