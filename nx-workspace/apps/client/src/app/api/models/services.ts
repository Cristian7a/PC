export interface packageService {
  id: string;
  name: string;
  description: string;
  features: string[];
  price: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  image: string | null;
  icon: string | null;
  price: number;
  packages: packageService[] | null;
  rating: number | null;
  //reviews: number;
  features: string[];
}
