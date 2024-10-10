import style from './index.module.css';
import todo from '../../../assets/todo.svg';
import { Eye, EyeClosed, User } from '@phosphor-icons/react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' }), // Comprimento mínimo da senha
  // .regex(/[A-Z]/, {
  //   message: 'A senha deve conter pelo menos uma letra maiúscula.',
  // })
  // .regex(/[a-z]/, {
  //   message: 'A senha deve conter pelo menos uma letra minúscula.',
  // })
  // .regex(/[0-9]/, { message: 'A senha deve conter pelo menos um número.' })
  // .regex(/[\W_]/, {
  //   message: 'A senha deve conter pelo menos um caractere especial.',
  // }),
});

type loginForm = Zod.infer<typeof loginFormSchema>;
export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginForm>({
    resolver: zodResolver(loginFormSchema),
  });
  function handleOnSubmit(userLogin: loginForm) {
    const { identifier, password } = userLogin;
    handleLogin(identifier, password);
  }

  function handlePasswordVisible(event: FormEvent) {
    event.preventDefault();
    setIsVisible((prevState) => !prevState);
  }

  async function handleLogin(identifier: string, password: string) {
    await axios
      .post('https://api-todo-list-production.up.railway.app/api/auth/local', {
        identifier,
        password,
      })
      .then((response) => {
        console.log('User profile', response.data.user);
        localStorage.setItem('jwt-todo', response.data.jwt);
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
        <form onSubmit={handleSubmit(handleOnSubmit)}>
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
            <span className={style.inputError}>
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
            <span className={style.inputError}>{errors.password.message}</span>
          )}
          {errorMessage && (
            <span className={style.errorMessage}>{errorMessage}</span>
          )}
          <button className={style.buttonForm} type="submit">
            ENTRAR
          </button>
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
