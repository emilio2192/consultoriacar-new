import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Case } from '../store/interfaces/cases.interface';
import { FirestoreService } from 'app/service/firestore.service';
import {  take } from 'rxjs';
import { UploadFileService } from 'app/service/upload-file.service';
import { AppState } from '../store/reducers';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../store/selectors/auth.selector';


@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.css']
})
export class CaseDetailComponent implements OnInit {
  correlative!:number;
  case$!: Case;
  file!: File;
  currentUser!: any;
  constructor(
    private route: ActivatedRoute, 
    private firestoreService: FirestoreService,
    private uploadService: UploadFileService,
    private store: Store<AppState>,
    private router: Router,
    ){
    this.correlative = +this.route.snapshot.params['id'];
  }

  async ngOnInit(): Promise<void> {
    await this.store.select(selectCurrentUser).pipe(
      take(1),
    )
    .subscribe( (response) => {
      if(response){
        this.currentUser = response;
      }
    });
    (await this.firestoreService.getCorrelative(this.correlative)).pipe(take(1))
    .subscribe(response => {
      if(response[0]){
        
        this.case$ = response[0] as unknown as Case;
        if(this.case$.client !== this.currentUser.uid && !this.currentUser.admin){
          this.router.navigate(['main/dashboad']);
        }
      }
    });

  }



  async onFileChanged(event:any){
    const {files} = event.target;
    const fileToUpload = files[0];
    const extension = new RegExp(/[^.]+$/).exec(fileToUpload.name);
    if(extension){
      this.file = files[0];
      const upload = await this.uploadService.fileUpload(this.file, this.correlative, extension[0]);
      const filesToUpdate = {key: upload.Key, url: upload.Location};
      await this.firestoreService.updateDocument({files:[...this.case$.files,filesToUpdate]}, this.correlative);
      this.ngOnInit();
    }
    
  }

  async removeFile(index:number) {
    const newFiles = this.case$.files.filter((element, _index) => index !== _index);
    const fileToRemove = this.case$.files.filter((element, _index) => index===_index);
    await this.uploadService.deleteFile(fileToRemove[0].key)
    await this.firestoreService.updateDocument({files:[...newFiles]}, this.correlative);
    this.ngOnInit();
  }

  async closeCase(){
    await this.firestoreService.updateDocument({isFinish: true}, this.correlative);
    this.case$.isFinish = true;
  }

  async openCase(){
    await this.firestoreService.updateDocument({isFinish: false}, this.correlative);
    this.case$.isFinish = false;
  }
}
