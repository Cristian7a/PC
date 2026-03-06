export interface ContactChannel {
  id: string;
  labelKey: string;
  descriptionKey?: string;
  value: string;
  icon: string;
  action: string;
  severity: 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast';
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: 'email',
    labelKey: 'menu.contact.fastActions.email.title',
    value: 'platoycopa.oficial@gmail.com',
    icon: 'pi pi-envelope',
    action: 'mailto:',
    severity: 'info',
  },
  {
    id: 'phone',
    labelKey: 'menu.contact.fastActions.phone.title',
    value: '2223780903',
    icon: 'pi pi-phone',
    action: 'tel:',
    severity: 'success',
  },
  {
    id: 'quotation',
    labelKey: 'menu.contact.fastActions.quoation.title',
    descriptionKey: 'menu.contact.fastActions.quoation.content',
    value: '/quotation',
    icon: 'pi pi-calculator',
    action: '',
    severity: 'primary',
  },
];
