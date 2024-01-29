export type HotelType = {
  _id: string;
  user: UserType;
  hotelName: string;
  city: string;
  country: string;
  description: string;
  bed: number;
  breakfast: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
};

export interface UserType {
  _id: string;
  email: string;
  password: string | undefined;
  passwordConfirm: string | undefined;
  firstName: string;
  avatar: string;
  lastName: string;
  role?: string;
}
