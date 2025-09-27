interface User {
  id: string;
  email?: string;
  aud?: string;
  role?: string;
  key: string;
}

export interface NavbarProps {
  user: User | null;
}
