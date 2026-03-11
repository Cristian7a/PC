import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import {
  AutoCompleteModule,
  AutoCompleteSelectEvent,
  AutoCompleteCompleteEvent,
} from 'primeng/autocomplete';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { createReviewSchema, CreateReviewDto } from 'packages/validation';
import { ServicesCustomerService } from '../../../api/customer/services-customer.service';
import { CategoriesCustomerService } from '../../../api/customer/categories-customer.service';
import { ReviewsCustomerService } from '../../../api/customer/reviews-customer.service';

interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-add-review-dialog',
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    DialogModule,
    InputTextModule,
    TextareaModule,
    FloatLabelModule,
    RatingModule,
    ButtonModule,
    AutoCompleteModule,
    MultiSelectModule,
    TooltipModule,
  ],
  templateUrl: './add-review-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddReviewDialogComponent implements OnInit {
  readonly visible = input.required<boolean>();
  readonly closed = output<void>();
  readonly isDialogScrolled = signal<boolean>(false);
  readonly formErrors = signal<Record<string, string>>({});
  readonly dirtyFields = new Set<string>(); // <-- Espacio agregado
  readonly isSubmitting = signal<boolean>(false);
  readonly filteredCategories = signal<{ label: string; value: string }[]>([]);

  private servicesService = inject(ServicesCustomerService);
  private categoriesService = inject(CategoriesCustomerService);
  private reviewsService = inject(ReviewsCustomerService);

  reviewForm = {
    name: '',
    contract: '',
    rating: 5,
    category: null as SelectOption | string | null,
    services: [] as string[],
    comment: '',
  };

  eventCategories: { label: string; value: string }[] = [];
  availableServices: { label: string; value: string }[] = [];

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.eventCategories = categories.map((c) => ({
        label: c.name,
        value: c.id,
      }));
    });

    this.servicesService.getServices().subscribe((services) => {
      this.availableServices = services.map((s) => ({
        label: s.name,
        value: s.id,
      }));
    });
  }

  get isFormValid(): boolean {
    const payload = this.buildPayload();
    return createReviewSchema.safeParse(payload).success;
  }

  searchCategory(event: AutoCompleteCompleteEvent) {
    const query = (event.query || '').toLowerCase();
    this.filteredCategories.set(
      this.eventCategories.filter((c) => c.label.toLowerCase().includes(query)),
    );
  }

  onInteraction(field: string) {
    this.dirtyFields.add(field);
    setTimeout(() => {
      this.validateRealTime();
    }, 0);
  }

  private validateRealTime() {
    const payload = this.buildPayload();
    const validationResult = createReviewSchema.safeParse(payload);

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

  private buildPayload(): CreateReviewDto {
    const cat = this.reviewForm.category;

    const categoryValue =
      cat && typeof cat === 'object' && 'value' in cat
        ? cat.value
        : typeof cat === 'string'
          ? cat
          : '';

    return {
      name: this.reviewForm.name,
      contract: this.reviewForm.contract,
      rating: this.reviewForm.rating,
      category: categoryValue,
      services: this.reviewForm.services,
      comment: this.reviewForm.comment,
    };
  }

  onDialogScroll(event: Event): void {
    const target = event.target as HTMLElement;
    this.isDialogScrolled.set(target.scrollTop > 20);
  }

  closeDialog() {
    this.reviewForm = {
      name: '',
      contract: '',
      rating: 5,
      category: null as { label: string; value: string } | null,
      services: [],
      comment: '',
    };
    this.formErrors.set({});
    this.dirtyFields.clear();
    this.isSubmitting.set(false);
    this.closed.emit();
  }

  submitReview() {
    if (!this.isFormValid) return;

    this.isSubmitting.set(true);
    const payload = this.buildPayload();
    this.reviewsService.createReview(payload).subscribe({
      next: (response) => {
        console.log('✅ Éxito:', response.message);
        this.isSubmitting.set(false);
        this.closeDialog();

        // *Nota:* En el futuro, aquí puedes agregar un "Toast" de PrimeNG
        // que diga "Su reseña fue enviada con éxito".
      },
      error: (error) => {
        console.error('❌ Hubo un error al enviar:', error);
        this.isSubmitting.set(false);
      },
    });
  }

  onCategorySelect(event: AutoCompleteSelectEvent) {
    this.reviewForm.category = event.value as SelectOption;
    this.onInteraction('category');
  }
}
