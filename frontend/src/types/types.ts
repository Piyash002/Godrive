export interface Tregister {
    name: string,
    number:string,
    email: string,
    password: string,
    rules:string,
    confirmpassword: string,
}
export interface  TLoginInputs {
  email:string;
  password:string;
}
export interface TImage {
  url: string;
  isMain?: boolean;
}
export interface TCar  {
  name: string;
  type: "SUV" | "Sedan" | "Hatchback" | "Hybrid" | "Electric" | "Luxury" | "Convertible" | "Truck";
  brand: string;
  modelYear: number;
  pricePerDay: number;
  images: TImage[];
  description: string;
  features?: string[]; 
  available: boolean;
  rating: number; 
  reviews: {
    user: string;
    comment: string;
    rating: number;
    date: Date;
  }[];
  addOns: {
    insurance: boolean;
    gps: boolean;
    childSeat: boolean;
    additionalDriver: boolean;
  };
}
