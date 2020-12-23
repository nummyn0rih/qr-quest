import React, { useContext, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import M from 'materialize-css';

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  };

  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <>
      <nav>
        <div className="nav-wrapper orange">
          <span className="brand-logo hide-on-med-and-down">QR Quest</span>
          <ul id="nav-mobile" className="right">
            <li>
              <NavLink to="/create">Создать</NavLink>
            </li>
            <li>
              <NavLink to={`/detail/5fdb98b0f8d0656f42a12ee9`}>Вопрос</NavLink>
            </li>
            <li>
              <NavLink to="/questions">Результаты</NavLink>
            </li>
            <li>
              <a href="/" onClick={logoutHandler}>
                Выйти
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
