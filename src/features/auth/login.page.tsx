import { ROUTES } from '@/shared/model/routes';

import { Link } from 'react-router-dom';
import { AuthLayout } from './ui/auth-layout';
import { LoginForm } from './ui/login-form';

function LoginPage() {
  return (
    <AuthLayout
      title={'Вход в систему'}
      description={'Введите ваш email и пароль для входа'}
      form={<LoginForm />}
      footer={
        <>
          Нет аккаунта?{' '}
          <Link className="ml-2 underline text-primary" to={ROUTES.REGISTER}>
            Зарегистрироваться
          </Link>
        </>
      }
    />
  );
}

export const Component = LoginPage;
