import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { QuestionsPage } from './pages/QuestionsPage';
import { CreatePage } from './pages/CreatePage';
import { DetailPage } from './pages/DetailPage';
import { AuthPage } from './pages/AuthPage';
import { ResultPage } from './pages/ResultPage';

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/questions" exact>
          <QuestionsPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Route path="/result/:id">
          <ResultPage />
        </Route>
        <Redirect to="/questions" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
