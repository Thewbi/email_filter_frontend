import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaillistComponent } from "./components/maillist/maillist.component";

import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, MaillistComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
