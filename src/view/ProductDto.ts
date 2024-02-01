export type ProductDto = {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  CategoryId: number | null;
};

export type ProductCreationDto = Omit<ProductDto, 'id'>;
