export interface SocialLink {
  label: string;
  icon: string;
  link: string;
  brandClass: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Facebook',
    icon: 'pi pi-facebook',
    link: 'https://www.facebook.com/profile.php?id=61572859833105',
    brandClass: '!bg-[#1877F2] !border-none',
  },
  {
    label: 'Instagram',
    icon: 'pi pi-instagram',
    link: 'https://www.instagram.com/platoycopa.oficial',
    brandClass: '!bg-gradient-to-b !from-[#833ab4] !via-[#fd1d1d] !to-[#fcb045] !border-none',
  },
  {
    label: 'Whatsapp',
    icon: 'pi pi-whatsapp',
    link: 'https://wa.me/522223780903',
    brandClass: '!bg-[#25D366] !border-none',
  },
];
