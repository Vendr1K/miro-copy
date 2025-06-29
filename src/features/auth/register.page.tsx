import { AuthLayout } from './auth-layout';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/model/routes';
import { RegisterForm } from './register-form';

function RegisterPage() {
  return (
    <AuthLayout
      title={'Регистрация'}
      description={'Введите ваш email и пароль для регистрации'}
      form={<RegisterForm />}
      footer={
        <>
          Уже есть аккаунт?{' '}
          <Link className="ml-2 underline text-primary" to={ROUTES.LOGIN}>
            Войти
          </Link>
        </>
      }
    />
  );
}

export const Component = RegisterPage;
