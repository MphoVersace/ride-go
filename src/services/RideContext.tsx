import React, { createContext, useContext, useState } from "react";

export type RideStatus =
  | "idle"
  | "searching"
  | "driver_found"
  | "in_progress"
  | "completed";

export type RideTier = "standard" | "comfort" | "luxury";

export interface ChatMessage {
  id: string;
  sender: "user" | "driver";
  text: string;
  time: string;
}

export interface DriverProfile {
  name: string;
  rating: number;
  carModel: string;
  licensePlate: string;
  phone: string;
  avatar: string;
  tripsCount: number;
  safetyRating: number;
}

export interface CompletedTrip {
  id: string;
  date: string;
  pickup: string;
  destination: string;
  fare: number;
  tip: number;
  total: number;
  tier: RideTier;
  driverName: string;
  rating: number;
  distance: string;
}

export interface SavedPlace {
  id: string;
  type: "home" | "work" | "favorite" | "airport";
  title: string;
  address: string;
  distance?: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  avatar: string;
  rating: number;
  completedRides: number;
  totalDistance: string;
  memberSince: string;
}

export interface PaymentMethodItem {
  id: string;
  type: "wallet" | "card" | "cash";
  title: string;
  subtitle: string;
  isDefault?: boolean;
}

interface LocationDetails {
  title: string;
  address: string;
  distance?: string;
}

interface RideContextType {
  status: RideStatus;
  pickup: LocationDetails;
  destination: LocationDetails;
  tier: RideTier;
  driver: DriverProfile;
  etaMinutes: number;
  chatMessages: ChatMessage[];
  rideHistory: CompletedTrip[];
  tierFares: Record<RideTier, number>;
  walletBalance: number;
  savedPlaces: SavedPlace[];
  userProfile: UserProfile;
  paymentMethods: PaymentMethodItem[];
  selectedPaymentMethod: string;
  setPickupLocation: (title: string, address: string) => void;
  setDestinationLocation: (title: string, address: string, distance?: string) => void;
  selectTier: (tier: RideTier) => void;
  startSearch: () => void;
  matchDriver: () => void;
  startRide: () => void;
  completeTrip: (rating: number, tip: number, comment?: string) => void;
  sendChatMessage: (text: string) => void;
  resetRide: () => void;
  topUpWallet: (amount: number) => void;
  addSavedPlace: (place: Omit<SavedPlace, "id">) => void;
  deleteSavedPlace: (id: string) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  selectPaymentMethod: (id: string) => void;
}

const defaultDriver: DriverProfile = {
  name: "Ucok Behel",
  rating: 4.9,
  carModel: "Honda CR-V (Black)",
  licensePlate: "AB6299ZG",
  phone: "+27 82 555 0192",
  avatar: "UB",
  tripsCount: 482,
  safetyRating: 98,
};

const initialHistory: CompletedTrip[] = [
  {
    id: "TRIP-9081",
    date: "10 Sep 2026, 18:45",
    pickup: "14 Long St, Cape Town",
    destination: "Camps Bay Beach, Cape Town",
    fare: 75,
    tip: 15,
    total: 90,
    tier: "comfort",
    driverName: "Sipho Khumalo",
    rating: 5,
    distance: "7.8 km",
  },
  {
    id: "TRIP-8842",
    date: "08 Sep 2026, 14:15",
    pickup: "Kloof St, Gardens",
    destination: "V&A Waterfront, Cape Town",
    fare: 45,
    tip: 10,
    total: 55,
    tier: "standard",
    driverName: "Ucok Behel",
    rating: 5,
    distance: "3.2 km",
  },
];

const initialSavedPlaces: SavedPlace[] = [
  {
    id: "place-1",
    type: "home",
    title: "Home",
    address: "14 Long St, Cape Town City Centre, 8001",
    distance: "0.0 km",
  },
  {
    id: "place-2",
    type: "work",
    title: "Work (Waterfront Office)",
    address: "19 Dock Rd, V&A Waterfront, 8001",
    distance: "2.4 km",
  },
  {
    id: "place-3",
    type: "airport",
    title: "Cape Town Int. Airport (CPT)",
    address: "Matroosfontein, Cape Town, 7490",
    distance: "19.5 km",
  },
  {
    id: "place-4",
    type: "favorite",
    title: "Camps Bay Promenade",
    address: "Victoria Rd, Camps Bay, Cape Town",
    distance: "7.8 km",
  },
];

const initialUserProfile: UserProfile = {
  name: "Mpho Versace",
  phone: "+27 71 234 5678",
  email: "mpho@ridego.co.za",
  avatar: "MV",
  rating: 4.95,
  completedRides: 28,
  totalDistance: "142 km",
  memberSince: "January 2026",
};

const initialPaymentMethods: PaymentMethodItem[] = [
  {
    id: "wallet",
    type: "wallet",
    title: "RideGo Wallet",
    subtitle: "Instant payment with in-app balance",
    isDefault: true,
  },
  {
    id: "card-1",
    type: "card",
    title: "Visa Debit",
    subtitle: "•••• 4821 • Exp 08/29",
  },
  {
    id: "card-2",
    type: "card",
    title: "Mastercard",
    subtitle: "•••• 9012 • Exp 12/28",
  },
  {
    id: "cash",
    type: "cash",
    title: "Cash to Driver",
    subtitle: "Pay directly upon arrival",
  },
];

const RideContext = createContext<RideContextType | undefined>(undefined);

export const RideProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [status, setStatus] = useState<RideStatus>("idle");
  const [pickup, setPickup] = useState<LocationDetails>({
    title: "14 Long St, Cape Town",
    address: "Cape Town City Centre, 8001",
  });
  const [destination, setDestination] = useState<LocationDetails>({
    title: "V&A Waterfront",
    address: "19 Dock Rd, Cape Town, 8001",
    distance: "2.4 km",
  });
  const [tier, setTier] = useState<RideTier>("standard");
  const [driver] = useState<DriverProfile>(defaultDriver);
  const [etaMinutes, setEtaMinutes] = useState(3);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "driver",
      text: "Hello! I am on my way to your pickup location.",
      time: "Just now",
    },
  ]);
  const [rideHistory, setRideHistory] = useState<CompletedTrip[]>(initialHistory);
  const [walletBalance, setWalletBalance] = useState<number>(250);
  const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>(initialSavedPlaces);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [paymentMethods] = useState<PaymentMethodItem[]>(initialPaymentMethods);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("wallet");

  const tierFares: Record<RideTier, number> = {
    standard: 45,
    comfort: 75,
    luxury: 140,
  };

  const setPickupLocation = (title: string, address: string) => {
    setPickup({ title, address });
  };

  const setDestinationLocation = (
    title: string,
    address: string,
    distance = "2.4 km"
  ) => {
    setDestination({ title, address, distance });
  };

  const selectTier = (selectedTier: RideTier) => {
    setTier(selectedTier);
  };

  const startSearch = () => {
    setStatus("searching");
  };

  const matchDriver = () => {
    setStatus("driver_found");
    setEtaMinutes(3);
  };

  const startRide = () => {
    setStatus("in_progress");
  };

  const completeTrip = (rating: number, tip: number, _comment?: string) => {
    const baseFare = tierFares[tier];
    const tripTotal = baseFare + tip;

    const newTrip: CompletedTrip = {
      id: `TRIP-${Math.floor(1000 + Math.random() * 9000)}`,
      date: "Today, just now",
      pickup: pickup.title,
      destination: destination.title,
      fare: baseFare,
      tip,
      total: tripTotal,
      tier,
      driverName: driver.name,
      rating,
      distance: destination.distance || "3.5 km",
    };

    setRideHistory((prev) => [newTrip, ...prev]);

    // Deduct from wallet if wallet is selected
    if (selectedPaymentMethod === "wallet") {
      setWalletBalance((prev) => Math.max(0, prev - tripTotal));
    }

    // Update profile stats
    setUserProfile((prev) => ({
      ...prev,
      completedRides: prev.completedRides + 1,
    }));

    setStatus("completed");
  };

  const sendChatMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text,
      time: "Just now",
    };

    setChatMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const driverReplies = [
        "Got it! I am right outside in the black CR-V.",
        "Perfect, hazard lights are on.",
        "Understood, see you in a moment!",
        "Thanks for letting me know, pulling up now.",
      ];
      const randomReply =
        driverReplies[Math.floor(Math.random() * driverReplies.length)];

      const driverMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "driver",
        text: randomReply,
        time: "Just now",
      };
      setChatMessages((prev) => [...prev, driverMsg]);
    }, 1000);
  };

  const resetRide = () => {
    setStatus("idle");
    setChatMessages([
      {
        id: "msg-init",
        sender: "driver",
        text: "Hello! I am on my way to your pickup location.",
        time: "Just now",
      },
    ]);
  };

  const topUpWallet = (amount: number) => {
    setWalletBalance((prev) => prev + amount);
  };

  const addSavedPlace = (place: Omit<SavedPlace, "id">) => {
    const newPlace: SavedPlace = {
      ...place,
      id: `place-${Date.now()}`,
    };
    setSavedPlaces((prev) => [newPlace, ...prev]);
  };

  const deleteSavedPlace = (id: string) => {
    setSavedPlaces((prev) => prev.filter((p) => p.id !== id));
  };

  const updateUserProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const nextName = updated.name ?? prev.name;
      const initials = nextName
        .split(" ")
        .map((p) => p[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      return {
        ...prev,
        ...updated,
        avatar: initials || prev.avatar,
      };
    });
  };

  const selectPaymentMethod = (id: string) => {
    setSelectedPaymentMethod(id);
  };

  return (
    <RideContext.Provider
      value={{
        status,
        pickup,
        destination,
        tier,
        driver,
        etaMinutes,
        chatMessages,
        rideHistory,
        tierFares,
        walletBalance,
        savedPlaces,
        userProfile,
        paymentMethods,
        selectedPaymentMethod,
        setPickupLocation,
        setDestinationLocation,
        selectTier,
        startSearch,
        matchDriver,
        startRide,
        completeTrip,
        sendChatMessage,
        resetRide,
        topUpWallet,
        addSavedPlace,
        deleteSavedPlace,
        updateUserProfile,
        selectPaymentMethod,
      }}
    >
      {children}
    </RideContext.Provider>
  );
};

export const useRide = () => {
  const context = useContext(RideContext);
  if (!context) {
    throw new Error("useRide must be used within a RideProvider");
  }
  return context;
};

export default RideContext;
