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
export type Court = {
  id: string;
  name: string;
  location: string;
  price: number;
  memberPrice: number;
  image: string;
  isIndoor: boolean;
  city: string;
  available: boolean;
};

// Membership type
export type MembershipTier = {
  id: string;
  name: string;
  price: number;
  benefits: string[];
  isPopular?: boolean;
};
