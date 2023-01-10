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

type ProfileContextType = {
  ref: LegacyRef<HTMLInputElement> | undefined;
  data?: HiringRequiredFields;
  setValues: (data: HiringRequiredFields) => void;
  focus: () => void | undefined;
};

const ProfileContext = createContext<ProfileContextType>({
  ref: null,
  data: undefined,
  setValues: () => null,
  focus: () => {
    return;
  },
});

export const ProfileContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<ProfileContextType['data']>(undefined);

  const setValues = (data: HiringRequiredFields) => setData(data);

  const focus = () => ref.current?.focus();

  const value = { data, setValues, ref, focus };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfileData = () => useContext(ProfileContext);
