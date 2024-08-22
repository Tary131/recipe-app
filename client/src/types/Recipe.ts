export interface Rating {
  userId: string;
  rating: number;
}

export interface Recipe {
  _id: string;
  name: string;
  description: string;
  ratings: Rating[];
}
