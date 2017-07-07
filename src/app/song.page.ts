import { Component } from '@angular/core';
import { Song } from './models/song';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'song-page',
  template: `
    <ion-header color="orange">
      <ion-navbar><ion-title> Licilongo </ion-title></ion-navbar>
    </ion-header>
    <ion-content>
        <h2>{{song.title}}</h2>
        <p>{{song.lyrics}}</p>
        <div>
          <ion-note>{{song.author}}</ion-note>
        </div>
    </ion-content>
  `
})

export class SongPage {
  song: Song;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.song = navParams.get('song');
 }
  goBack() {
    this.navCtrl.pop();
  }
}
