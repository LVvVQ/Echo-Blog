import { Icons } from "@/components/Icons";

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  links: {
    github: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

type Response<T> = {
  code: number;
  message: string;
  data: T;
};

type User = {
  id: number;
  username: string;
  roles: string[];
  avatar: string?;
};

type Role = {
  id: number;
  name: string;
  description: string;
  menus: Menu[];
};

type LoginResponse = User & {
  accessToken: string;
  refreshToken: string;
};

export type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type UserAuthFormData = {
  username: string;
  password: string;
};

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type Post = {
  id?: number;
  title: string;
  content?: string;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
  authorId?: number;
};
