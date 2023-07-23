import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/service/fetch';
import { IProfile } from '@/types/user';

const useProfile = () => {
  const { data: profile, refetch: refetchProfile } = useQuery<IProfile>({
    queryKey: ['profile'],
    queryFn: () => fetcher('/api/me/profile'),
  });

  return { profile, refetchProfile };
};

export default useProfile;
