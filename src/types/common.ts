export type ErrorMessage = {
  path: string;
  message: string;
};

export type ErrorApiResponseType = {
  success: boolean;
  message: string;
  errorMessages: ErrorMessage[];
};

export type ApiResponseType<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type Review = {
  rating: number;
  comment: string;
  userEmail: string;
};

export type BookType = {
  _id: string;
  title: string;
  author: string;
  image: string;
  link: string;
  publicationDate: number;
  genre: string;
  reviews: Review[];
};
