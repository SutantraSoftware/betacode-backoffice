import { Component, OnInit } from '@angular/core';
import { ContactusService } from './contactus.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss'],
})
export class ContactusComponent implements OnInit {
  ContactForms: any[] = [];
  name: string = '';
  email: string = '';
  phone: string = '';
  service: string = '';
  createdAt: any = '';

  constructor(private Service: ContactusService) {}

  ngOnInit() {
    this.Service.getAllContactforms().subscribe((res) => {
      console.log(res);
      this.ContactForms = res;
    });
  }
}
