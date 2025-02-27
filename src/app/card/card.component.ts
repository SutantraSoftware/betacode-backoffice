import { Component, Input } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() items?: any[];
  beUrl: string = 'http://localhost:4000/';

  isModalOpen = false;
  // newCountry = { country_name: '', country_code: '', image: '' };
  selectedImage: File | null = null;
  //dashboardService: any;
  isEditing: number | null = null;

  newCountry: {
    country_name: string;
    country_code: string;
    image: string;
    imageBase64?: string;
  } = {
    country_name: '',
    country_code: '',
    image: '',
    imageBase64: '',
  };

  constructor(private dashboardService: DashboardService) {}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newCountry.image = file.name;
    }
  }
  submitForm() {
    // Add the new country object to the items array
    console.log(this.newCountry);
    this.items?.push({ ...this.newCountry });
    this.addCountryDetails(this.newCountry);
    // Reset the newCountry object to clear the form
    const CountryData = {
      country_name: this.newCountry.country_name, // Add other form data
      country_code: this.newCountry.country_code,
      image: this.newCountry.image,
    };

    // Close the modal after adding
    this.closeModal();
  }

  // Trigger Edit Mode
  editCard(index: number) {
    this.isEditing = index; // Set the index of the card to edit
  }

  // Save the changes
  saveCard(index: number) {
    this.isEditing = null; // Exit edit mode
    // You could also make an API call here to persist changes if needed
  }

  // Cancel the edit
  cancelEdit() {
    this.isEditing = null; // Exit edit mode without saving
  }

  // Delete Card
  deleteCard(index: number) {
    this.items?.splice(index, 1); // Remove the item from the array
  }
  addCountryDetails(newCountry: any) {
    this.dashboardService.addCountryDetails(newCountry).subscribe(
      (res) => {
        console.log(res); // Handle the response
      },
      (error) => {
        console.error('Error adding country:', error); // Handle errors
      }
    );
  }
}
