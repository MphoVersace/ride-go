export * from "../navigation/types";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface PlaceLocation {
  id: string;
  name: string;
  address: string;
  coords?: Coordinates;
  type?: "home" | "work" | "recent" | "favorite";
}

export interface RideDetails {
  id: string;
  driverName?: string;
  driverRating?: number;
  carModel?: string;
  plateNumber?: string;
  pickupLocation: string;
  dropoffLocation: string;
  price: number;
  currency: string;
  date: string;
  status: "completed" | "in_progress" | "cancelled" | "searching";
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  rating: number;
  avatarUrl?: string;
}
