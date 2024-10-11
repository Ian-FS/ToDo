import style from './index.module.css';
import todo from '/todo.svg';
import { Eye, EyeClosed, User } from '@phosphor-icons/react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../../context/useAuth';

const loginFormSchema = z.object({
  identifier: z
    .string()
    .min(3, { message: 'O usuário deve ter pelo menos 3 caracteres.' }) // Comprimento mínimo
    .max(20, { message: 'O usuário não pode ter mais de 20 caracteres.' }) // Comprimento máximo
    .regex(/^[a-zA-Z0-9-_]+$/, {
      message:
        'O usuário só pode conter letras, números, hífens e underscores.',
    }),

  password: z
    .string()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' }), //
});

type loginForm = Zod.infer<typeof loginFormSchema>;
export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginForm>({
    resolver: zodResolver(loginFormSchema),
  });

  function handlePasswordVisible(event: FormEvent) {
    event.preventDefault();
    setIsVisible((prevState) => !prevState);
  }

  async function handleLogin(userData: loginForm) {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const loginEndPoint = import.meta.env.VITE_LOGIN_ENDPOINT;
    const loginURL = `${apiBaseUrl}${loginEndPoint}`;

    await axios
      .post(loginURL, userData)
      .then((response) => {
        localStorage.setItem('jwt-todo', response.data.jwt);
        setIsAuthenticated(true);
        navigate('/tasks');
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setErrorMessage('Usuário ou senha incorretos. Tente novamente.');
        } else {
          setErrorMessage(
            'Ocorreu um erro ao realizar o login. Tente novamente mais tarde.',
          );
        }
        console.log('An error occurred:', error.response);
      });
  }

  return (
    <div className={style.main}>
      <div className={style.loginWrapper}>
        <img className={style.logo} src={todo} alt="todo" />
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className={style.inputWrapper}>
            <input
              type="text"
              className={style.inputLogin}
              placeholder="Usuário"
              {...register('identifier')}
            />
            <User className={style.iconPhospor} />
          </div>
          {errors.identifier && (
            <span className={style.errorMessage}>
              {errors.identifier.message}
            </span>
          )}
          <div className={style.inputWrapper}>
            <input
              type={isVisible ? 'text' : 'password'}
              className={style.inputLogin}
              placeholder="Senha"
              {...register('password')}
            />
            {isVisible ? (
              <button className={style.iconButton}>
                <Eye
                  onClick={handlePasswordVisible}
                  className={style.iconPhospor}
                />
              </button>
            ) : (
              <button className={style.iconButton}>
                <EyeClosed
                  onClick={handlePasswordVisible}
                  className={style.iconPhospor}
                />
              </button>
            )}
          </div>
          {errors.password && (
            <span className={style.errorMessage}>
              {errors.password.message}
            </span>
          )}
          <button className={style.buttonForm} type="submit">
            ENTRAR
          </button>
          {errorMessage && (
            <span className={style.errorMessage}>{errorMessage}</span>
          )}
          <div className={style.signUp}>
            Não tem uma conta?{' '}
            <Link className={style.linkRegister} to={'/register'}>
              Registre-se
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
