export interface IOption {
  label: string;
  value: string;
}

export interface ISort {
  property: string;
  direction: 'ASC' | 'DESC';
}

export interface ITab {
  id: string;
  title: string;
  children: React.ReactNode;
}

export interface IPageable {
  first: boolean;
  last: boolean;
  hasNext: boolean;
  page: number;
  totalPages: number;
  totalElements: number;
}
