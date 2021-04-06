import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { ActionSheetController } from '@ionic/angular';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { LocalDataService } from '../../services/local-data.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() i: number;
  @Input() inFavorites: Boolean;

  constructor(
    private iab: InAppBrowser,
    private socialSharing: SocialSharing,
    private localDataService: LocalDataService,
    private actionSheetCtrl: ActionSheetController,
  ) { }

  ngOnInit() {}

  showNews() {
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async toggleMenu() {
    let toggleFavoriteBtn;

    if (this.inFavorites) {
      toggleFavoriteBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.localDataService.removeFavorite(this.noticia);
        }
      };
    } else {
      toggleFavoriteBtn = {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          this.localDataService.saveNews(this.noticia);
        }
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      },
      toggleFavoriteBtn,
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => { }
      }]
    });
    await actionSheet.present();
  }

}
