import axios from 'axios';
import style from './index.module.css';
import { Envelope, Eye, EyeClosed, User } from '@phosphor-icons/react';
import todo from '/todo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const registerFormSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'O usuário deve ter pelo menos 3 caracteres.' }) // Comprimento mínimo
      .max(20, { message: 'O usuário não pode ter mais de 20 caracteres.' }) // Comprimento máximo
      .regex(/^[a-zA-Z0-9-_]+$/, {
        message:
          'O usuário só pode conter letras, números, hífens e underscores.',
      }),
    email: z
      .string()
      .min(1, { message: 'O campo de email é obrigatório.' }) // Verifica se o email não está vazio
      .email({ message: 'Formato de email inválido.' }),
    password: z
      .string()
      .min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  });

type registerForm = z.infer<typeof registerFormSchema>;

export default function Register() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerForm>({
    resolver: zodResolver(registerFormSchema),
  });

  function handlePasswordVisible(event: FormEvent) {
    event.preventDefault();
    setIsVisible((prevState) => !prevState);
  }

  async function handleRegister(registerUserData: registerForm) {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const registerEndPoint = import.meta.env.VITE_REGISTER_ENDPOINT;
    const registerURL = `${apiBaseUrl}${registerEndPoint}`;
    const { username, email, password } = registerUserData;
    await axios
      .post(registerURL, {
        username,
        email,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          navigate('/login');
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setErrorMessage('E-mail ou nome de usuário já estão em uso');
        }
        console.log('An error occurred:', error.response);
      });
  }
  return (
    <div className={style.main}>
      <div className={style.registerWrapper}>
        <img className={style.logo} src={todo} alt="todo" />
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className={style.inputWrapper}>
            <input
              type="text"
              className={style.inputRegister}
              placeholder="Usuário"
              {...register('username')}
            />
            <User className={style.iconPhospor} />
          </div>
          {errors.username && (
            <span className={style.errorMessage}>
              {errors.username.message}
            </span>
          )}
          <div className={style.inputWrapper}>
            <input
              type="email"
              className={style.inputRegister}
              placeholder="Email"
              {...register('email')}
            />
            <Envelope className={style.iconPhospor} />
          </div>
          {errors.email && (
            <span className={style.errorMessage}>{errors.email.message}</span>
          )}
          <div className={style.inputWrapper}>
            <input
              type={isVisible ? 'text' : 'password'}
              className={style.inputRegister}
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
          <div className={style.inputWrapper}>
            <input
              type={isVisible ? 'text' : 'password'}
              className={style.inputRegister}
              placeholder="Confirme a senha"
              {...register('confirmPassword')}
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
          {errors.confirmPassword && (
            <span className={style.errorMessage}>
              {errors.confirmPassword.message}
            </span>
          )}
          <button className={style.buttonForm} type="submit">
            CADASTRAR
          </button>
          {errorMessage && (
            <span className={style.errorMessage}>{errorMessage}</span>
          )}
          <div className={style.wrapperLinkLogin}>
            Já possui uma conta?{' '}
            <Link className={style.linkLogin} to={'/login'}>
              Entre
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
