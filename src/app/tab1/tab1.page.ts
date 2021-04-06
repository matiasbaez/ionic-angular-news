import { Component } from '@angular/core';

import { NoticiasService } from '../services/noticias.service';

import { Article } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    noticias: Article[] = [];

    constructor(
        private noticiaService: NoticiasService
    ) {}

    ngOnInit() {
        this.getNews();
    }

    loadData(event) {
        this.getNews(event);
    }

    getNews(event?) {
        this.noticiaService.getTopHeadlines()
        .subscribe(res => {
            if (res.articles.length === 0) {
                event.target.disabled = true;
                event.target.complete();
                return;
            }

            this.noticias.push(...res.articles);
                if (event) {
                event.target.complete();
            }
        });
    }

}
