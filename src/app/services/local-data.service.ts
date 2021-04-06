import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  noticias: Article[] = [];

  constructor(
    private storage: NativeStorage,
    private toastCtrl: ToastController
  ) {
    this.getFavorites();
  }

  saveNews(noticia: Article) {
    const control = this.noticias.find(news => news.title === noticia.title);

    if (!control) {
      this.noticias.unshift(noticia);
      this.storage.setItem('favorites', this.noticias);
    }

    this.presentToast('Añadido a favoritos');
  }

  async getFavorites() {
    const favorites = await this.storage.getItem('favorites');

    if (favorites) {
      this.noticias = favorites;
    }
  }

  removeFavorite(noticia) {
    this.noticias = this.noticias.filter(news => news.title !== noticia.title);
    this.storage.setItem('favorites', this.noticias);

    this.presentToast('Eliminado de favoritos');
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
