import { rqClient } from '@/shared/api/instance';
import { CONFIG } from '@/shared/model/config';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/kit/button';
import { Card, CardFooter, CardHeader } from '@/shared/ui/kit/card';
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
    <div className="container mx-auto p-4">
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
        <div className="grid gap-4 grid-cols-3">
          {boardsQuery.data?.map((board) => (
            <Card key={board.id}>
              <CardHeader>
                <Button asChild variant="link">
                  <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
                    {board.name}
                  </Link>
                </Button>
              </CardHeader>
              <CardFooter>
                <Button
                  variant={'destructive'}
                  disabled={deleteBoardMutation.isPending}
                  onClick={() =>
                    deleteBoardMutation.mutate({
                      params: { path: { boardId: board.id } },
                    })
                  }
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export const Component = BoardsListPage;
