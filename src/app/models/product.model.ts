export interface IProduct {
  ID: string;
  name: string;
  img: string;
  stockAmount: number;
  cost: number;
  price: number;
  type: 'EGG' | 'EGG_OTHER' | 'PANEL';
  createdAt: string;
  updatedAt: string;
}
