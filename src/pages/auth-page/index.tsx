import style from './index.module.css';
import todo from '../../assets/todo.svg';
import { EyeSlash, User } from '@phosphor-icons/react';
import axios from 'axios';

export default function LoginPage() {
  async function handleLogin() {
    await axios
      .post('https://api-todo-list-production.up.railway.app/api/auth/local', {
        identifier: 'ian',
        password: 'ian28199208',
      })
      .then((response) => {
        console.log('User profile', response.data.user);
        localStorage.setItem('jwt-todo', response.data.jwt);
        window.location.reload();
      })
      .catch((error) => {
        console.log('An error occurred:', error.response);
      });
  }
  async function handleRegister() {
    await axios
      .post(
        'https://api-todo-list-production.up.railway.app/api/auth/local/register',
        {
          username: 'iana',
          email: 'iaan_franca.dev@outlook.com',
          password: 'ian28199208',
        },
      )
      .then((response) => {
        // console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
      })
      .catch((error) => {
        console.log('An error occurred:', error.response);
      });
  }

  return (
    <div className={style.main}>
      <div className={style.loginWrapper}>
        <img className={style.logo} src={todo} alt="todo" />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleLogin();
          }}
        >
          <div className={style.inputWrapper}>
            <input
              type="text"
              className={style.inputLogin}
              placeholder="Usuário"
            />
            <User className={style.userIcon} />
          </div>
          <div className={style.inputWrapper}>
            <input
              type="password"
              className={style.inputLogin}
              placeholder="Senha"
            />
            <EyeSlash className={style.userIcon} />
          </div>
          <button type="submit">ENTRAR</button>
        </form>
      </div>
    </div>
  );
}
