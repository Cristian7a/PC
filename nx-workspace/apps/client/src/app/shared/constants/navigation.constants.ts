export interface NavSection {
  id: string;
  fragment: string;
  labelKey: string;
  icon: string;
}

export const NAV_SECTIONS: NavSection[] = [
  { id: 'home', fragment: 'inicio', labelKey: 'sections.home', icon: 'pi pi-home' },
  { id: 'services', fragment: 'servicios', labelKey: 'sections.services', icon: 'pi pi-briefcase' },
  { id: 'reviews', fragment: 'reseñas', labelKey: 'sections.reviews', icon: 'pi pi-star' },
  { id: 'gallery', fragment: 'galeria', labelKey: 'sections.gallery', icon: 'pi pi-images' },
  { id: 'about', fragment: 'nosotros', labelKey: 'sections.about', icon: 'pi pi-info-circle' },
  { id: 'contact', fragment: 'contacto', labelKey: 'sections.contact', icon: 'pi pi-envelope' },
];
