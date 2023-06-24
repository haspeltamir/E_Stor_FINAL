import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/home/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/pages/home/home.component';
import { SearchComponent } from './components/home/search/search.component';
import { DevicePageComponent } from './components/pages/device-page/device-page.component';
import { TagsComponent } from './components/home/tags/tags.component';
import { ShoppingCartPageComponent } from './components/pages/shopping-cart-page/shopping-cart-page.component';
import { TitleComponent } from './components/home/title/title.component';
import { NotFoundComponent } from './components/home/not-found/not-found.component';
// import { RatingModule } from 'ng-starrating';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    DevicePageComponent,
    TagsComponent,
    ShoppingCartPageComponent,
    TitleComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    // RatingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
