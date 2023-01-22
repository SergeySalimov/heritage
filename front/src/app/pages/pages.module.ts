import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageWrapperComponent } from './page-wrapper/page-wrapper.component';
import { NavigationModule } from '../modules';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [
    PageWrapperComponent
  ],
  imports: [
    CommonModule,
    NavigationModule,
    PagesRoutingModule,
  ]
})
export class PagesModule { }
