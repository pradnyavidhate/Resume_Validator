import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { UploadService } from '../upload.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  files: { file: File; name: string; status?: string }[] = [];

 // @ViewChild('singleInput', { static: false })
  
  @ViewChild('multipleInput', { static: false })
  multipleInput!:ElementRef;
  //singleInput!: ElementRef;
  file: any;
  multiplefiles = [];

  constructor(private http: HttpClient, private fileUploadService:UploadService) {
  }
  selectfile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log("file are:", file);
      this.file = file;
    }
  }

  uploadfile() {
    // construct formdate
    const formdata = new FormData();
    formdata.append('file', this.file);

    // post request
    this.http.post<any>('http://localhost:8000/file', formdata).
      subscribe((res) => {
        console.log(res);
      })
  }
  multipleuploadfile(event:any) {
  if(event.target.files.length > 0){
    this.multiplefiles =event.target.files;
     console.log('this.multiplefiles',this.multiplefiles);
  }
  }
  onMultipleSubmit(){
    const formdata= new FormData();

    for(let multifile of this.multiplefiles){
      formdata.append('files',multifile);
    }
    // this.http.post<any>('http://localhost:8000/multiplefile',formdata).subscribe((res)=>{
    //     console.log(res);
    //   this.multipleInput.nativeElement.value="";
    //   this.multiplefiles=res.path;    
    // })
    this.http.post<any>('http://localhost:8000/multiplefile',formdata).subscribe((res)=>{
     
    // console.log(res);
    this.multipleInput.nativeElement.value="";
    this.multiplefiles=res.path;  
    console.log("this.multiplefiles",this.multiplefiles); 
    this.multiplefiles.forEach((i: any) => {
      setInterval(() => {
        console.log(i)
      }, 10000);
    })
  })
  }

  ////file upload

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        this.files.push({ file: input.files[i], name: input.files[i].name });
      }
    }
  }

  uploadFiles(): void {
    this.files.forEach((fileObj, index) => {
      this.fileUploadService.uploadFile(fileObj.file).subscribe({
        next: (event) => {
          if (event.type === 4) {
            // Upload completed
            this.files[index].status = 'Uploaded';
          }
        },
        error: () => {
          this.files[index].status = 'Failed';
        },
      });
    });
  }
}
