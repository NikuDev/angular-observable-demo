import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

// request maken met de httpClient
import { HttpClientModule } from '@angular/common/http';
import { HttpRequestExamplesComponent } from './components/http-request-examples/http-request-examples.component';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, HttpRequestExamplesComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
