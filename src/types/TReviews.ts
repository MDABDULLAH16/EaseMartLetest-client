export interface TReview {
  createdAt: string | number | Date;
  _id: string;
  userName: string;
  productId: string;
  description: string;
  star: number;
}
