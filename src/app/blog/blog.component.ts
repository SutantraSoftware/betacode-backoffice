import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { BlogService } from './blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  blogsList: any = [];
  title: string = '';
  date: string = '';
  description: string = '';
  image: string = '';
  likes: number = 0;
  file!: File | null;
  imageWarning : string = "";
  isModalOpen = false;
  isModaleditOpen = false
  isEditing: number | null = null;
  editingIndex: number | null = null;
  // successmessage : any ;
  // successMessage : string = " ";
  private unsubscribe$ = new Subject<void>();

  constructor(private service: BlogService) {}

  ngOnInit() {
    this.service.fetchAndSetblogs();
    this.service.blogs$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((blogs) => {
        this.blogsList = blogs;
      });
  }
  openModal() {
    this.isModalOpen = true;
    this.title = " ";
    this.description =  " " ;
    this.date = " " ;
    this.image = " ";
  }
  closeModal() {
    this.isModalOpen = false;
    this.editingIndex = null;
  }
  openEditModal(item: any, index: number) {
    this.isModaleditOpen = true
    this.editingIndex = index;
    this.title = item.title;
    this.description = item.description;
    this.date = item.date;
    this.image = item.image;
  }
  closeEditModal() {
    this.isModaleditOpen = false;
    this.editingIndex = null;
  }
  
  saveCard() {
    if (this.editingIndex !== null) {
      const updatedBlog = {
        _id: this.blogsList[this.editingIndex]._id, 
        title: this.title,
        description: this.description,
        date: this.date,
        image: this.image, 
      };
       this.service.updateBlog(updatedBlog).subscribe((res) => {
       
        if (this.editingIndex !== null) {
          this.blogsList[this.editingIndex] = res; 
        }
        this.service.fetchAndSetblogs();
        this.closeModal(); 
      });
      
    }
  }
  cancelEdit() {
    this.isEditing = null;
  }
  deleteCard(blogId: any) {
    this.service.deleteblogDetails(blogId).subscribe(() => {
      this.service.fetchAndSetblogs(); 
    });
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) {
      this.imageWarning = 'No image selected! Please choose an image to upload.';
      console.warn('No file selected');
      return;
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      this.imageWarning = 'File is too large! Please select an image smaller than 5MB.';
      console.warn('Selected file exceeds size limit:', file.size);
      return;
    }
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      this.imageWarning = 'Invalid file type! Please select a JPEG or PNG image.';
      console.warn('Invalid file type:', file.type);
      return;
    }

    this.imageWarning = '';
    this.file = file;
    this.convertFileToBase64(file).then((base64Image) => {
      this.image = base64Image;  
    });
  }
  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }
  async submitBlog() {
    if (this.file) {
      const base64Image = await this.convertFileToBase64(this.file);
      this.image = base64Image;
    }
    
    const blogData = {
      title: this.title,
      date: this.date,
      description: this.description,
      image: this.image,
      likes: this.likes
    };

    this.service.addBlog(blogData).subscribe((res) => {
    this.resetForm();
    this.service.fetchAndSetblogs();  
    // if (this.title) {
    //   this.successmessage= true;
    //   this.successMessage = "Blog added successfully!"
    // }
    // console.log('Blog added successfully!')
    });
  }

  resetForm() {
    this.title = '';
    this.date = '';
    this.description = '';
    this.image = '';
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}





