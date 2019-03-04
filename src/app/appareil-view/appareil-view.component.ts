import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})

export class AppareilViewComponent implements OnInit, OnDestroy {

  appareils: any[];
  appareilSubscription: Subscription;

  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });


  constructor(private appareilService: AppareilService) { }

  //Souscription au Subject pour recevoir les données émises par le service
  ngOnInit() {
    this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
      (appareils: any[]) => {
        this.appareils = appareils;
      }
    );
    this.appareilService.emitAppareilSubject();
  }

  onFetch() {
    this.appareilService.getAppareilsFromServer();
  }

  onSave(){
    this.appareilService.saveAppareilsToServer();
  }

  onAllumer()
  {
    this.appareilService.switchOnAll();
  }

  onEteindre()
  {
    if(confirm('Etes-vous sûr de vouloir éteindre tous vos appareil?')) {
      this.appareilService.switchOffAll();
    }else{
      return null;
    }
  }

  //Implémentation OnDestroy pour détruire la souscription
  ngOnDestroy() {
    this.appareilSubscription.unsubscribe();
  }

}
