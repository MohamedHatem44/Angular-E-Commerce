export interface Product {
  imageCover: string;
  title: string;
  category: {
    name: string;
  };
  price: number;
  ratingsAverage: number;
  _id: string;
  description: string;
  images: string;
}
