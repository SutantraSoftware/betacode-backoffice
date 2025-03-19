import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() items: any[]=[]; // input items array
  beUrl: string = 'http://localhost:4000/';
  isModalOpen = false;
  isEditModalOpen = false;
  selectedImage: File | null = null;
  isEditing: number | null = null;
  file!: File | null;
  editableImage: any;
  updatedItem: any;
  destroy$=new Subject<any>();
  cardItems:any;
  allFlagsEnabled:boolean=true;
  newCountry: {
    country_name: string;
    country_code: string;
    imagePath: string;
  } = {
    country_name: '',
    country_code: '',
    imagePath: '',
  };

  constructor(
    private dashboardService: DashboardService,
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private renderer:Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] && changes['items'].currentValue) {
      this.cardItems = changes['items'].currentValue;
      console.log('Items changed:', this.cardItems);
      if(this.allFlagsEnabled){
        this.cardItems = this.cardItems.slice(0, 4); 
      }
    }
  }

  ngOnInit(): void {
    console.log('Initial items:', this.items);
    if (this.items && this.items.length > 0) {
      this.updateCardItems(this.cardItems);
    }
  }

  // Helper method to process cardItems (sanitizing image paths)
  private updateCardItems(cardItems:any): void {
    cardItems?.forEach((item: any) => {
      item.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(
        `data:image/png;base64, ${item.imagePath}`
      );
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // Edit card and open the edit modal
  openEditModal(item: any, index: number) {
    this.isModalOpen = true;
    this.isEditModalOpen = true; // Open the edit modal
    this.isEditing = index; // Mark the current card as editing
    this.newCountry = { ...item }; // Pass the current country details to the modal
    console.log(this.newCountry); // Check if data is correctly passed
  }

  // Close the edit modal
  closeEditPopup(event: any) {
    this.isModalOpen = false;
    this.isEditModalOpen = event;
    this.isEditing = null; // Reset editing status
  }

  saveCard(index: number) {
    this.isEditing = null;
  }

  cancelEdit() {
    this.isEditing = null;
  }

  deleteCard(itemId: any) {
    this.dashboardService.deleteCountryDetails(itemId).subscribe(() => {
      this.dashboardService.fetchAndSetCountries();
    });
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

  async submitForm(form: NgForm) {
    if (form.valid) {
      if (this.file) {
        try {
          const base64Image = await this.convertFileToBase64(this.file);
          this.newCountry.imagePath = base64Image;
          this.dashboardService.addCountryDetails(this.newCountry).subscribe({
            next: () => {
              this.dashboardService.fetchAndSetCountries();
            },
            error: (err) => {
              console.error('Error creating post', err);
            },
          });
        } catch (error) {
          console.error('Error converting image to Base64', error);
        }
      } else {
        console.error('Please select an image file to upload.');
      }
    } else {
      console.error('Form is not valid');
    }
    this.resetForm();
  }
  resetForm() {
    this.newCountry.country_code = '';
    this.newCountry.country_name = '';
    this.newCountry.imagePath = '';
    this.isModalOpen = false;
  }
 
  showAllFlags(){
    this.allFlagsEnabled=false;
    this.cardItems=[...this.items];
  }
  hideSomeFlags(){
    this.allFlagsEnabled=true;
    this.cardItems = this.cardItems.slice(0, 4); 
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
