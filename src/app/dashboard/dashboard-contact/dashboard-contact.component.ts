import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ContactusService } from 'src/app/contactus/contactus.service';

@Component({
  selector: 'dashboard-contact',
  templateUrl: './dashboard-contact.component.html',
  styleUrls: ['./dashboard-contact.component.scss']
})
export class DashboardContactComponent implements OnInit, OnDestroy {
  ContactForms: any[] = [];
  name: string= "";
  email: string="";
  phone: string="";
  service: string="";
  visibleContacts:any;
  destroy$=new Subject<any>();
  
  constructor(private Service:ContactusService){}
  
  ngOnInit(){
    this.Service.getAllContactforms().subscribe((res)=>{
       this.ContactForms = res;
       this.visibleContacts=this.ContactForms.slice(0, 4);
    })
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

