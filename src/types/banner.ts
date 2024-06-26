import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/service/fetch';

export interface IBanner {
  id: React.Key;
  title: string;
  content: string;
  imageUrl?: string;
  backgroundColor?: string;
  backgroundImageUrl?: string;
  priority: number;
  visible: boolean;
  targetUrl?: string;
  createdDate: string;
  lastModifiedDate: string;
}

export const useBanners = () => {
  return useQuery<IBanner[]>({
    queryKey: ['banner'],
    queryFn: () => fetcher('/api/banner/all'),
  });
};
