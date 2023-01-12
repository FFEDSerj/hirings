import type { Mode, Hiring as FullHiring } from '@prisma/client';
import { type HiringMutationAction } from '../context/ProfileContext';
import { trpc } from './../utils/trpc';

type Hiring = Pick<
  FullHiring,
  'id' | 'createdAt' | 'mode' | 'title' | 'salary' | 'position' | 'description'
>;

type InitialHiring = {
  id?: string;
  createdAt?: Date;
  title: string;
  description: string | null;
  position: string;
  salary: number;
  mode: Mode;
};

const transformHiringsData = (
  action: HiringMutationAction,
  hirings: Hiring[],
  hiring: InitialHiring
) => {
  if (action === 'update' && hiring?.id) {
    const updatedHirings = hirings.map(h => {
      if (h.id === hiring.id) {
        return { ...hiring, id: h.id, createdAt: h.createdAt };
      }
      return h;
    });
    return updatedHirings;
  } else {
    const newHiring = {
      ...hiring,
      id: String(Math.random()),
      createdAt: new Date(),
    };
    return [...hirings, newHiring];
  }
};

export const useHiringActionsMutation = (action: HiringMutationAction) => {
  const utils = trpc.useContext();

  const { mutateAsync } = trpc.hiring.createOrUpdateHiring.useMutation({
    onMutate: async hiring => {
      await utils.auth.getUser.cancel();
      const snapshotData = utils.auth.getUser.getData();

      if (snapshotData && snapshotData.company) {
        const hirings = transformHiringsData(
          action,
          snapshotData.company.hirings,
          hiring
        );

        utils.auth.getUser.setData(undefined, {
          ...snapshotData,
          company: { ...snapshotData.company, hirings },
        });
      }

      return { snapshotData };
    },
    onError: (_error, _variables, context) => {
      if (context?.snapshotData) {
        utils.auth.getUser.setData(undefined, context.snapshotData);
      }
    },
    onSettled: () => {
      utils.auth.getUser.invalidate();
    },
  });

  return mutateAsync;
};
