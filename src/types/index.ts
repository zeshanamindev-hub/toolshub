export interface LayoutProps {
  children: React.ReactNode;
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
}

export interface HeaderProps {
  title: string;
  navigation?: NavigationItem[];
}