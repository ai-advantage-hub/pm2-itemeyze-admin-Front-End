import { Component } from '@angular/core';
import { AppService } from '../core/services/common/app.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
  title = '';

  constructor(private headerTitle: AppService) {}

  ngOnInit() {
    this.headerTitle.title.subscribe(title => {
      this.title = title;
    });
  }

}