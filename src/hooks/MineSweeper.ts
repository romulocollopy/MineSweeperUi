import { graphql, useLazyLoadQuery, useMutation } from 'react-relay';
import { Board } from '../domain';
import type { Mutable } from '../types';
import type { MineSweeperMutation } from './__generated__/MineSweeperMutation.graphql';
import type { MineSweeperQuery } from './__generated__/MineSweeperQuery.graphql';

export const MineSweeperGameQuery = graphql`
  query MineSweeperQuery($slug: String!, $difficulty: String!) {
    mineSweeper(slug: $slug, difficulty: $difficulty) {
      slug
      flags
      gameOver
      won
      timeElapsed
      blocks {
        coordinates {
          x
          y
        }
        display
        isFlagged
      }
    }
  }
`;

export const MineSweeperGameMutation = graphql`
  mutation MineSweeperMutation($slug: String!, $coordinates: CoordinatesInput!, $action: String!) {
    updateBoard(slug: $slug, coordinates: $coordinates, action: $action) {
      mineSweeper {
        slug
        flags
        blocks {
          coordinates {
            x
            y
          }
          display
          isFlagged
        }
      }
      timeElapsed
      won
      gameOver
    }
  }
`;

export function useMineSweeperQuery(slug: string, difficulty: string) {
  const data = useLazyLoadQuery<MineSweeperQuery>(MineSweeperGameQuery, { slug, difficulty });
  return data.mineSweeper as Mutable<typeof data.mineSweeper>;
}

export function useUpdateBoard() {
  const [commit, isInFlight] = useMutation<MineSweeperMutation>(MineSweeperGameMutation);

  const sendBoardClick = (
    slug: string,
    coordinates: { x: number; y: number },
    action: string,
    onCompleted: (board: Board, gameOver: boolean, won: boolean) => void
  ) => {
    commit({
      variables: { slug, coordinates, action },
      onCompleted: (data) => {
        if (data?.updateBoard) {
          onCompleted(
            Board.fromDto(
              data.updateBoard.mineSweeper as Mutable<typeof data.updateBoard.mineSweeper>
            ),
            data.updateBoard.gameOver,
            data.updateBoard.won
          );
        }
      },
    });
  };

  return { sendBoardClick, isInFlight };
}
