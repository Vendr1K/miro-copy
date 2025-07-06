import { publicRqClient } from '@/shared/api/instance';
import { ROUTES } from '@/shared/model/routes';
import { useSession } from '@/shared/model/session';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
  const navigate = useNavigate();

  const session = useSession();

  const registerMutation = publicRqClient.useMutation(
    'post',
    '/auth/register',
    {
      onSuccess: (data) => {
        session.login(data.accessToken);
        navigate(ROUTES.BOARDS);
      },
    }
  );

  const register = (
    data: { email: string; password: string } /* ApiSchemas['RegisterRequest']*/
  ) => {
    registerMutation.mutate({ body: data });
  };

  const errorMessage = registerMutation.isError
    ? registerMutation.error.message
    : null;

  return {
    register,
    isPending: registerMutation.isPending,
    errorMessage,
  };
};
