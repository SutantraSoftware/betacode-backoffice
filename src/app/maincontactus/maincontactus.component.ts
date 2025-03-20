import { Component, OnInit } from '@angular/core';
import { MaincontactusService } from './maincontactus.service';

@Component({
  selector: 'app-maincontactus',
  templateUrl: './maincontactus.component.html',
  styleUrls: ['./maincontactus.component.scss']
})
export class MaincontactusComponent implements OnInit {

mainContactusForms: any[]= [];
name: string="";
email: string="";
phone: number | undefined;
service: string="";
project : string ="";
message: string ="";
createdAt : any="";

constructor(private Service:MaincontactusService){}

ngOnInit(): void {
    this.Service.getAllMainContactusforms().subscribe((res)=>{
      console.log(res);

      this.mainContactusForms = res.map(item => ({
        ...item,
        createdAt: new Date(item.createdAt) 
      }));
      this.mainContactusForms.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      
    })
  }


}
