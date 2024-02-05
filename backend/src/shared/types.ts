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
  bookings: BookingType[];
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

export interface HotelSearchResponse {
  hotels: HotelType[];
  pagination: {
    totalDocument: number;
    page: number;
    pages: number;
  };
}

export type BookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
  paymentIntentId?: string;
};

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
};
