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
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { createReviewSchema, CreateReviewDto } from 'packages/validation';
import { ServicesCustomerService } from '../../../api/customer/services-customer.service';
import { CategoriesCustomerService } from '../../../api/customer/categories-customer.service';
import { ReviewsCustomerService } from '../../../api/customer/reviews-customer.service';
import { Category } from '../../../api/models/categories';
import { Service } from '../../../api/models/services';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-review-dialog',
  standalone: true,
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
    SelectModule,
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
  readonly dirtyFields = new Set<string>();
  readonly isSubmitting = signal<boolean>(false);

  private servicesService = inject(ServicesCustomerService);
  private categoriesService = inject(CategoriesCustomerService);
  private reviewsService = inject(ReviewsCustomerService);
  private messageService = inject(MessageService);
  private translate = inject(TranslateService);

  reviewForm = {
    name: '',
    contract: '',
    rating: 5,
    category: null as Category | null,
    services: [] as Service[],
    comment: '',
  };

  readonly eventCategories = signal<Category[]>([]);
  readonly availableServices = signal<Service[]>([]);

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.eventCategories.set(categories);
    });

    this.servicesService.getServices().subscribe((services) => {
      this.availableServices.set(services);
    });
  }

  get isFormValid(): boolean {
    return createReviewSchema.safeParse(this.reviewForm).success;
  }

  onInteraction(field: string) {
    this.dirtyFields.add(field);
    setTimeout(() => {
      this.validateRealTime();
    }, 0);
  }

  private validateRealTime() {
    const validationResult = createReviewSchema.safeParse(this.reviewForm);

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

  onDialogScroll(event: Event): void {
    const target = event.target as HTMLElement;
    this.isDialogScrolled.set(target.scrollTop > 20);
  }

  closeDialog() {
    this.reviewForm = {
      name: '',
      contract: '',
      rating: 5,
      category: null,
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

    const payload = createReviewSchema.parse(this.reviewForm) as CreateReviewDto;

    this.reviewsService.createReview(payload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.messageService.add({
          severity: 'success',
          summary: this.translate.instant('toast.review.success_summary'),
          detail: this.translate.instant('toast.review.success_detail'),
        });
        this.closeDialog();
      },
      error: () => {
        this.isSubmitting.set(false);
        this.messageService.add({
          severity: 'success',
          summary: this.translate.instant('toast.review.success_summary'),
          detail: this.translate.instant('toast.review.success_detail'),
        });
      },
    });
  }
}
