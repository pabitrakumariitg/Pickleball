// Navigation
export type NavItem = {
  title: string;
  href: string;
  description?: string;
};

export type MainNavItem = NavItem;

export type SiteConfig = {
  name: string;
  description: string;
  mainNav: MainNavItem[];
  links: {
    facebook: string;
    instagram: string;
    whatsapp: string;
  };
};

// Feature cards
export type FeatureItem = {
  title: string;
  description: string;
  icon: React.ElementType;
};

// Event type
export type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
};

// Court type
export interface Court {
  _id: string;
  name: string;
  venue: string;
  type: 'indoor' | 'outdoor';
  surface: 'concrete' | 'asphalt' | 'wood' | 'synthetic';
  price: number;
  capacity: number;
  description: string;
  openingTime: string;
  closingTime: string;
  status: 'active' | 'maintenance' | 'inactive';
  amenities?: ('parking' | 'showers' | 'lockers' | 'equipment_rental' | 'cafe' | 'wifi')[];
  image?: string;
}

// Membership type
export type MembershipTier = {
  id: string;
  name: string;
  price: number;
  benefits: string[];
  isPopular?: boolean;
};

export interface Booking {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  court: {
    _id: string;
    name: string;
    location: string;
  };
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment?: {
    _id: string;
    status: string;
    amount: number;
  };
  totalAmount: number;
  players: number;
  notes?: string;
  cancellationReason?: string;
  createdAt: string;
}
