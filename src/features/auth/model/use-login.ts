import { publicRqClient } from '@/shared/api/instance';
import { ROUTES } from '@/shared/model/routes';
import { useSession } from '@/shared/model/session';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();

  const session = useSession();

  const loginMutation = publicRqClient.useMutation('post', '/auth/login', {
    onSuccess: (data) => {
      session.login(data.accessToken);
      navigate(ROUTES.BOARDS);
    },
  });

  const login = (
    data: { email: string; password: string } /* ApiSchemas['LoginRequest']*/
  ) => {
    loginMutation.mutate({ body: data });
  };

  const errorMessage = loginMutation.isError
    ? loginMutation.error.message
    : null;

  return {
    login,
    isPending: loginMutation.isPending,
    errorMessage,
  };
};
