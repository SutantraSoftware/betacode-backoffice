import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'country-details-edit',
  templateUrl: './country-details-edit.component.html',
  styleUrls: ['./country-details-edit.component.scss'],
})
export class CountryDetailsEditComponent implements OnInit, OnDestroy {
  file!: File | null;
  destroy$ = new Subject<any>();
  @Input() countryDetails: any;
  @Input() isEditModalOpen: boolean = false;
  @Output() closeEditPopup = new EventEmitter();

  constructor(private dashboardService: DashboardService, private sanitizer: DomSanitizer, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log(this.countryDetails); // Check if data is passed
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }
  closeEditModal() {
    this.isEditModalOpen = false;
    this.closeEditPopup.emit(this.isEditModalOpen);
    this.resetForm();
    this.cdRef.markForCheck();
  }
resetForm(){
  this.countryDetails.country_name="";
  this.countryDetails.country_code="";
  this.countryDetails.imagePath="";
}
  async updateCountryForm(form: NgForm) {
    if (form.valid) {
        try {
          if(this.file){
            const base64Image = await this.convertFileToBase64(this.file);
            this.countryDetails.imagePath = base64Image;
          }
          else{
            this.countryDetails.imagePath= this.countryDetails.imagePath;
          }
          this.dashboardService.updateCountryDetails(this.countryDetails._id, this.countryDetails).subscribe({
            next: (res) => {
              console.log(res);
              this.dashboardService.fetchAndSetCountries(); // This will update the countries list in all subscribers
            this.closeEditPopup.emit(false); 
            },
            error: (err) => {
              console.error('Error updating post', err);
            }
          });
        } catch (error) {
          console.error('Error converting image to Base64', error);
        }
      
    } else {
      console.error('Form is not valid');
    }
    this.closeEditModal();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
