import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from './home';
import { SongService } from './song.service';
import { SearchbarComponent } from './searchbar.component';
import { SongPage } from './song.page';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SongPage,
    SearchbarComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SongPage,
    SearchbarComponent,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SongService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
