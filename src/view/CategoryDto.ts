export type CategoryDto = {
  id: number;
  title: string;
};

export type CategoryCreationDto = Omit<CategoryDto, 'id'>;
