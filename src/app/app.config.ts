import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"fir-vorkurs","appId":"1:442961139002:web:8075c0f4b19cd3a8f1ec03","storageBucket":"fir-vorkurs.firebasestorage.app","apiKey":"AIzaSyBN-fPFmpOO5J3lS8n0uBU0l83XGMklG58","authDomain":"fir-vorkurs.firebaseapp.com","messagingSenderId":"442961139002"})), provideFirestore(() => getFirestore())]
};
