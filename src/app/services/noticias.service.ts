import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TopHeadlinesRes } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  topHeadlinesPage = 0;
  currentCategory = '';
  categoryPage = 0;

  constructor(
    private http: HttpClient
  ) { }

  private makePetition<T>(url: string) {
    url = apiUrl + url;
    return this.http.get<T>(url, {headers});
  }

  getTopHeadlines() {
    this.topHeadlinesPage++;
    return this.makePetition<TopHeadlinesRes>(`/top-headlines?country=us&page=${this.topHeadlinesPage}`);
    // return this.http.get<TopHeadlinesRes>(`${apiUrl}/top-headlines?country=us&category=business&apiKey=${apiKey}`);
  }

  getHeadlinesByCategory(category) {
    if (this.currentCategory === category) {
      this.categoryPage++;
    } else {
      this.categoryPage = 1;
      this.currentCategory = category;
    }

    return this.makePetition<TopHeadlinesRes>(`/top-headlines?country=us&category=${category}&page=${this.categoryPage}`);
    // return this.http.get<TopHeadlinesRes>(`${apiUrl}/top-headlines?country=us&category=${category}&apiKey=${apiKey}`);
  }
}
