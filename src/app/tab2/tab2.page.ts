import { Component, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';

import { NoticiasService } from '../services/noticias.service';

import { Article } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild('categories_segment') segment: IonSegment;

  categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  constructor(
    private noticiasService: NoticiasService,
  ) {}

  ngOnInit() { }

  ngAfterViewInit() {
    this.segment.value = this.categories[0];
    this.getNewsByCategory(this.categories[0]);
  }

  segmentChanged(event) {
    this.noticias = [];
    this.getNewsByCategory(event.detail.value);
  }

  loadData(event) {
    this.getNewsByCategory(this.segment.value, event);
  }

  getNewsByCategory(category, event?) {
    this.noticiasService.getHeadlinesByCategory(category)
    .subscribe(res => {
      this.noticias.push(...res.articles);

      if (event) {
        event.target.complete();
      }
    });
  }

}
