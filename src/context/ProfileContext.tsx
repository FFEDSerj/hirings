import {
  createContext,
  type LegacyRef,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { type Hiring } from '@prisma/client';

export type HiringRequiredFields = Pick<
  Hiring,
  'id' | 'position' | 'description' | 'salary' | 'mode' | 'title'
>;

export const hiringMutationAction = {
  create: 'create',
  update: 'update',
} as const;

export type HiringMutationAction = keyof typeof hiringMutationAction;

type ProfileContextType = {
  ref: LegacyRef<HTMLInputElement> | undefined;
  action: HiringMutationAction;
  data?: HiringRequiredFields;
  focus: () => void | undefined;
  setUpdateMutationAction: (data: HiringRequiredFields) => void;
  setCreateMutationAction: () => void;
};

const ProfileContext = createContext<ProfileContextType>({
  ref: null,
  action: 'create',
  data: undefined,
  focus: () => {
    return;
  },
  setUpdateMutationAction(a) {
    console.log(a);
  },
  setCreateMutationAction() {
    null;
  },
});

export const ProfileContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<ProfileContextType['data']>(undefined);
  const [action, setAction] = useState<HiringMutationAction>('create');

  const setUpdateMutationAction = (data: HiringRequiredFields) => {
    setAction('update');
    setData(data);
  };

  const setCreateMutationAction = () => {
    setAction('create');
    setData(undefined);
  };

  const focus = () => ref.current?.focus();

  const value = {
    data,
    setUpdateMutationAction,
    ref,
    focus,
    action,
    setCreateMutationAction,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfileData = () => useContext(ProfileContext);
