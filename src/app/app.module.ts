import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store, StoreModule } from '@ngrx/store';

//Firebase
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { environment } from './environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// import { LoginComponent } from './auth/login/login.component';
// import { ForgotpwdComponent } from './auth/forgotpwd/forgotpwd.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { LoginComponent } from './auth/login/login.component';
import { LoginComponent } from './auth/login/login.component';
// angular material Imports
import { MatGridListModule } from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';

import { AuthService } from './service/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { metaReducers, reducers } from './store/reducers';
// import { AuthService } from './service/auth.service';
import { StoreDevtoolsModule} from '@ngrx/store-devtools'
import { FirestoreService } from './service/firestore.service';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EffectsModule } from '@ngrx/effects'
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgrxStoreIdbModule } from 'ngrx-store-idb';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { UsersComponent } from './users/users.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CaseDetailComponent } from './case-detail/case-detail.component';
import {MatListModule} from '@angular/material/list';
import { UploadFileService } from './service/upload-file.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    DashboardComponent,
    ForgotComponent,
    UsersComponent,
    CaseDetailComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatButtonToggleModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreDevtoolsModule.instrument({maxAge:25,trace: true}),
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatListModule,
    MatSortModule,
    MatSnackBarModule,
    MatPaginatorModule,
    NgxDatatableModule,
    MatProgressSpinnerModule,
    EffectsModule.forRoot([]),
    NgrxStoreIdbModule.forRoot({
      keys:[
        {auth: ['sessionUid', 'currentUser']},
        {users: ['users']},
        {cases: ['cases', 'clientSelected', 'statusSelected']}
      ],
      debugInfo: false,
      rehydrate: true
    }),
  ],
  providers: [
    AuthService,
    AngularFirestoreModule,
    UploadFileService,
    FirestoreService,
    {provide: FIREBASE_OPTIONS, useValue: environment.firebase}, 
    
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
