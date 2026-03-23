import { ChangeDetectionStrategy, Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { TooltipModule } from 'primeng/tooltip';
import { SelectModule } from 'primeng/select';
import { contactFormSchema, ContactFormDTO } from 'packages/validation';
import { ContactCustomerService } from '../../api/customer/contact-customer.service';
import { CategoriesCustomerService } from '../../api/customer/categories-customer.service';
import { Category } from '../../api/models/categories';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-section',
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    InputTextModule,
    FloatLabelModule,
    TextareaModule,
    ButtonModule,
    DatePickerModule,
    AnimateOnScrollModule,
    TooltipModule,
    SelectModule,
  ],
  templateUrl: './contact-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSectionComponent implements OnInit {
  private readonly contactService = inject(ContactCustomerService);
  private readonly categoriesService = inject(CategoriesCustomerService);
  private translate = inject(TranslateService);
  private messageService = inject(MessageService);
  readonly minDateAllowed = new Date();
  readonly eventCategories = signal<Category[]>([]);

  contactForm = {
    name: '',
    category: null as Category | null,
    date: null as Date | null,
    message: '',
  };

  readonly isSubmitting = signal<boolean>(false);
  readonly formErrors = signal<Record<string, string>>({});
  readonly dirtyFields = new Set<string>();

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.eventCategories.set(categories);
    });
  }

  private buildPayload(): ContactFormDTO {
    return {
      ...this.contactForm,
      eventType: this.contactForm.category?.name || '',
    } as unknown as ContactFormDTO;
  }

  get isFormValid(): boolean {
    const payload = this.buildPayload();
    return contactFormSchema.safeParse(payload).success;
  }

  onInteraction(field: string) {
    this.dirtyFields.add(field);
    setTimeout(() => {
      this.validateRealTime();
    }, 0);
  }

  private validateRealTime() {
    const payload = this.buildPayload();
    const validationResult = contactFormSchema.safeParse(payload);

    if (!validationResult.success) {
      const errors: Record<string, string> = {};
      for (const issue of validationResult.error.issues) {
        const fieldName = issue.path[0] as string;
        if (this.dirtyFields.has(fieldName) && !errors[fieldName]) {
          errors[fieldName] = issue.message;
        }
      }
      this.formErrors.set(errors);
    } else {
      this.formErrors.set({});
    }
  }

  submitContact() {
    if (!this.isFormValid) return;
    this.isSubmitting.set(true);

    const payload = this.buildPayload();

    this.contactService.processContactForm(payload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: this.translate.instant('toast.contact.success_summary'),
          detail: this.translate.instant('toast.contact.success_detail'),
        });
        this.handleSuccess(payload);
      },
      error: (err) => {
        console.error('Backup failed, but redirecting anyway:', err);
        this.messageService.add({
          severity: 'success',
          summary: this.translate.instant('toast.contact.success_summary'),
          detail: this.translate.instant('toast.contact.success_detail'),
        });
        this.handleSuccess(payload);
      },
    });
  }

  private handleSuccess(payload: ContactFormDTO) {
    const whatsappUrl = this.contactService.generateWhatsAppUrl(payload);

    setTimeout(() => {
      this.isSubmitting.set(false);
      window.open(whatsappUrl, '_blank');

      this.contactForm = { name: '', category: null, date: null, message: '' };
      this.dirtyFields.clear();
      this.formErrors.set({});
    }, 800);
  }

  goToDetailedPlanner() {
    // Aquí en el futuro navegarás a tu ruta del cotizador
    console.log('Navegando al Planificador Detallado...');
  }

  directWhatsApp() {
    const phoneNumber = '522223780903';
    const message = this.translate.instant('contact.whatsapp.direct_intro');
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
}
