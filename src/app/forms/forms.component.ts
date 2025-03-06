import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit, OnDestroy {
  countries: any = [];
  countryCode: string = '';
  heading1: string = '';
  content1: string = '';
  heading2: string = '';
  content2: string = '';
  images: string[] = [];
  destroy$ = new Subject<any>();
  banner1: any;
  banner2: any;
  banner3: any;
  countryContent: any;
  isObjectResponse: boolean = false;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private service: DashboardService,
    private cd: ChangeDetectorRef, 
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.getCountries();
    this.route.params.subscribe((res) => {
      this.countryCode = res['code'] || 'AUS';
      if (this.countryCode) {
        this.getCountryContent();
      }
    });
  }

  ngOnInit(): void {}
  getCountries() {
    this.service.getCountriesDetails().subscribe((countries) => {
      this.countries = countries;
      this.cd.markForCheck();
    });
  }

  onCountryChange(event: Event) {
    this.countryCode = (event.target as HTMLSelectElement).value;
    if (event) {
      this.getCountryContent();
    }
  }

  getCountryContent() {
    this.service.getCountryContent(this.countryCode).subscribe({
      next: (content) => {
        console.log(content);
        this.countryContent = content;

        this.isObjectResponse =
          typeof this.countryContent === 'object' &&
          this.countryContent !== null;

        if (this.isObjectResponse) {
          this.content1 = this.countryContent.content1;
          this.content2 = this.countryContent.content2;
          this.heading2 = this.countryContent.heading2;
          this.heading1 = this.countryContent.heading1;
          this.countryCode = this.countryContent.country_code;
        }
      },
      error: (error) => {
        this.isObjectResponse = false;
        this.resetForm();
        console.log('No Data: ' + error);
      },
    });
  }
  getSanitizedImage(base64: string) {
    return this.sanitizer.bypassSecurityTrustUrl(
      'data:image/png;base64,' + base64
    );
  }
  onFileSelected(event: Event, index: number) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.images[index] = reader.result as string;
      };
    }
  }

  resetForm() {
    this.heading1 = '';
    this.content1 = '';
    this.heading2 = '';
    this.content2 = '';
    this.images = [];
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
  submitForm() {
    const formData = {
      country_code: this.countryCode,
      heading1: this.heading1,
      content1: this.content1,
      heading2: this.heading2,
      content2: this.content2,
      image1: this.images[0],
      image2: this.images[1],
      image3: this.images[2],
    };
    this.service
      .addContentToCountry(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        console.log(res);
        this.resetForm();
      });
  }
  updateForm() {
    const formData = {
      country_code: this.countryCode,
      heading1: this.heading1,
      content1: this.content1,
      heading2: this.heading2,
      content2: this.content2,
      image1: this.images[0],
      image2: this.images[1],
      image3: this.images[2],
    };

    this.service
      .updateContentToCountry(formData, this.countryContent._id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        console.log(res);
        this.resetForm();
        this.isObjectResponse = false;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
