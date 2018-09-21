import { Component, OnInit } from '@angular/core';
import { FooterService } from './footer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
  status: string;
  constructor(
    private service: FooterService
  ) {
  }

  ngOnInit(): void {
    this.service.status.subscribe(s => {
      this.status = s;
    })
  }

}
