import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() items?: any[];
  beUrl: string = 'http://localhost:4000/';
  isModalOpen = false;
  isEditModalOpen = false;
  selectedImage: File | null = null;
  isEditing: number | null = null;
  file!:File|null;
  editableImage:any;
  updatedItem:any;
  newCountry: {
    country_name: string;
    country_code: string;
    imagePath: string;
  } = {
    country_name: '',
    country_code: '',
    imagePath: '',
  };

  constructor(private dashboardService: DashboardService, private sanitizer: DomSanitizer, private cdRef:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.items?.forEach((item)=>{
      item.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${item.imagePath}`);    })
  }
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  editCard(index: number) {
    this.isEditing = index; 
  }
  openEditModal(item:any, index:number){
    this.isEditModalOpen=true;
    this.isEditing = index; 
    this.newCountry=item;
    console.log(this.newCountry);
    this.cdRef.markForCheck();
  }
  closeEditPopup(event:any) {
    this.isEditModalOpen = event;
    this.isEditing = null; 
    this.cdRef.markForCheck();
  }
  saveCard(index: number) {
    this.isEditing = null; 
  }

  cancelEdit() {
    this.isEditing = null; 
  }

  deleteCard(index: number) {
    this.items?.splice(index, 1); 
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }
    
  convertFileToBase64(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string); // Base64 result
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file); // Convert file to Base64
      });
  }
    
  async submitForm(form: NgForm) {
      if (form.valid) {
        if (this.file) {
          try {
            const base64Image = await this.convertFileToBase64(this.file);
            this.newCountry.imagePath=base64Image;
            this.dashboardService.addCountryDetails(this.newCountry)
            .subscribe({
              next: () => {
                
              },
              error: (err) => {
                console.error('Error creating post', err);
              }
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
  resetForm(){
    this.newCountry.country_code="";
    this.newCountry.country_name="";
    this.newCountry.imagePath="";
    this.isModalOpen=false;
  }
  ngOnDestroy(): void {
    
  }
}
