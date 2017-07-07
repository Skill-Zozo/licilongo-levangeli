import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Song } from './models/song';
import { SongService } from './song.service';
import { SongPage } from './song.page';
import { Platform } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: './templates/home.html'
})
export class HomePage {
  songPage: SongPage;
  songs: Song[] = [];

  constructor(
    public navCtrl: NavController,
    private songService: SongService,
    platform: Platform
  ) {
      platform.ready().then(() => {
        this.songService.initDB().then((success: boolean) => {
          success ?
          this.songService.getSongs().then((songs: Song[]) => this.songs = songs)
          : console.log("we're fucked");
        });
      });
  }

  // ngOnInit(): void {
  //   this.songService.getSongs().then(songs => this.songs = songs);
  // }

  goToSongPage(song: Song): void {
      // if(!(song.ID in this.songPages)) {
      //   this.songPages[song.ID] = {song: song};
      // }
      this.navCtrl.push(SongPage, {song: song})
  }

}
