export type ApiResponseInterface<T> = {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
};
