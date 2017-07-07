import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { SongService } from './song.service';
import { Song } from './models/song';
import { NavController } from 'ionic-angular'
import { SongPage } from './song.page'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';



@Component({
  selector: 'searchbar',
  templateUrl: './templates/search.html'

})

export class SearchbarComponent {
  private query = new Subject<string>();
  private displayResults = false;
  private songs: Observable<Song[]>;
  private songPage: SongPage;

  constructor(
    private songService: SongService,
    private navCtrl: NavController
  ) {}

  search(term: string): void {
    this.displayResults = true;
    this.query.next(term);
  }

  // get searchbox, flush it, change routes
  goToSongPage(song: Song): void {
    this.displayResults = false;
    // if(!(song.ID in this.songPages)) {
    //   this.songPages[song.ID] = {song: song};
    // }
    this.navCtrl.push(SongPage, {song: song})
  }

  ngOnInit(): void {
    this.songs = this.query
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term
        ? this.songService.search(term)
        : Observable.of<Song[]>([]))
  }
}
