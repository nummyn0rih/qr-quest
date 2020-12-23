import React from 'react';

export const ResultList = ({ questions }) => {
  const correctAnswers = questions.reduce(
    (acc, quest) => (quest.isSuccessfully ? acc + 1 : acc),
    0
  );

  if (!questions.length) {
    return (
      <p className="flow-text center">
        Вы не ответили ни на один вопрос. Найдите и отсканируйте QR код.
      </p>
    );
  }

  return (
    <div className="row">
      <div className="col s12 m10 xl8 offset-m1 offset-xl2">
        <table>
          <thead>
            <tr>
              <th className="flow-text right-align">Правильных ответов</th>
              <th className="flow-text center-align">{correctAnswers}</th>
            </tr>
          </thead>

          <tbody>
            {questions.map((quest) => (
              <tr key={quest._id}>
                <td>{quest.question[0].question}</td>
                <td>
                  {quest.isSuccessfully ? (
                    <i className="medium material-icons teal-text text-accent-3">done</i>
                  ) : (
                    <i className="medium material-icons amber-text text-darken-4">close</i>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
