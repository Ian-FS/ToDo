import { useNavigate } from 'react-router-dom';
import style from './index.module.css';
import { SignOut } from '@phosphor-icons/react';
import { useAuth } from '../../context/useAuth';

export default function LogOutButton() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  function handleLogOut() {
    localStorage.removeItem('jwt-todo');
    setIsAuthenticated(false);
    navigate('/');
  }

  return (
    <div className={style.wrapperLogOut}>
      {localStorage.getItem('jwt-todo') ? (
        <button
          className={style.logOutButton}
          type="submit"
          onClick={handleLogOut}
        >
          Sair
          <SignOut className={style.iconPhospor} />
        </button>
      ) : null}
    </div>
  );
}
