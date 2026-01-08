export interface NavSection {
  id: string;
  fragment: string;
  labelKey: string;
  icon: string;
}

export const NAV_SECTIONS: NavSection[] = [
  { id: 'home', fragment: 'inicio', labelKey: 'pages.home', icon: 'pi pi-home' },
  { id: 'services', fragment: 'servicios', labelKey: 'pages.services', icon: 'pi pi-briefcase' },
  { id: 'reviews', fragment: 'reseñas', labelKey: 'pages.reviews', icon: 'pi pi-star' },
  { id: 'gallery', fragment: 'galeria', labelKey: 'pages.gallery', icon: 'pi pi-images' },
  { id: 'about', fragment: 'nosotros', labelKey: 'pages.about', icon: 'pi pi-info-circle' },
  { id: 'contact', fragment: 'contacto', labelKey: 'pages.contact', icon: 'pi pi-envelope' },
];
