export interface User {
  name: string;
  profession: string;
  description: string;
  email: string;
  location: string;
  profileImage: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
