import { IPageable } from './common';

export interface IProductFormInputs {
  product: IProduct;
}

export interface IProductList {
  content: IProduct[];
  pageable: IPageable;
}

export interface IProduct {
  id: string;
  amounts: number;
  price: number;
  discountRate: number;
  discountPrice: number;
  discountExpiredDate: string;
  expiredDate: string;
  deleted: boolean;
}
