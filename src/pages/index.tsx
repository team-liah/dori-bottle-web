import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { fetcher } from '@/service/fetch';
import { IProfile } from '@/types/user';

//#region Styled Components

//#endregion

export default function Home() {
  const { data: profile } = useQuery<IProfile>({
    queryKey: ['profile'],
    queryFn: () => fetcher('/api/me/profile'),
  });

  return (
    <div>
      {JSON.stringify(profile)}
      <Link href={'/login'}>
        <div>로그인 페이지로 이동</div>
      </Link>
    </div>
  );
}
