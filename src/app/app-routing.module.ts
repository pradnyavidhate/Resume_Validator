import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: "", component: UploadComponent
  },
   {
    path: "Upload", component: UploadComponent
  }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
