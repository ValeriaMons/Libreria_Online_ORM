export interface Book {
  id: number;
  title: string;
  author: string;
  published_year: number | null;
  genre: string | null;
  stock: number | null;
}