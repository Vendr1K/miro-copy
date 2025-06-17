import { rqClient } from '@/shared/api/instance';
import { CONFIG } from '@/shared/model/config';
import { ROUTES } from '@/shared/model/routes';
import { useQueryClient } from '@tanstack/react-query';
import { href, Link } from 'react-router-dom';

function BoardsListPage() {
  const queryClient = useQueryClient();
  const boardsQuery = rqClient.useQuery('get', '/boards');

  // console.log(boardsQuery.data);
  // const createBoardMutation = rqClient.useMutation('post', '/boards', {
  //   onSuccess: (data) => {
  //     console.log('Board created:', data);
  //     boardsQuery.refetch();
  //   },
  // });

  const createBoardMutation = rqClient.useMutation('post', '/boards', {
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['get', '/boards'] });
    },
  });

  const deleteBoardMutation = rqClient.useMutation(
    'delete',
    '/boards/{boardId}',
    {
      onSettled: async () => {
        await queryClient.invalidateQueries({ queryKey: ['get', '/boards'] });
      },
    }
  );

  return (
    <div>
      <h1>Boards list {CONFIG.API_BASE_URL}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const name = formData.get('name') as string;
          createBoardMutation.mutate({ body: { name: name } });
        }}
      >
        <input name="name" placeholder="Board name" />
        <button type="submit" disabled={createBoardMutation.isPending}>
          CreateBoard
        </button>
      </form>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {boardsQuery.data?.map((board) => (
          <div key={board.id}>
            <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
              {board.name}
            </Link>
            <button
              disabled={deleteBoardMutation.isPending}
              onClick={() =>
                deleteBoardMutation.mutate({
                  params: { path: { boardId: board.id } },
                })
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export const Component = BoardsListPage;
