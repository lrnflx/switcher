import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppareilService {

    // créer un Subject dans le service qui gèrera données de types any[]
    appareilsSubject = new Subject<any[]>();
    
    private appareils = [
        { 
          id: 1,
          name: 'Machine à laver',
          status: 'éteint'
        },
        {
          id: 2,
          name: 'Frigo',
          status: 'allumé'
        },
        { 
          id: 3,
          name: 'Ordinateur',
          status: 'éteint'
        }
      ];

    //Injection du client http
    constructor(private http: HttpClient){};

    saveAppareilsToServer(){
      this.http
        .put('https://switcher-oc.firebaseio.com/appareils.json', this.appareils)
        .subscribe(
          () => {
            console.log('Enregistrement terminé!');
          },
          (error) => {
            console.log('Erreur! :' + error);
          }
        );
    }

    getAppareilsFromServer(){
      this.http
        .get<any[]>('https://switcher-oc.firebaseio.com/appareils.json')
        .subscribe(
          (response) => {
            this.appareils = response;
            this.emitAppareilSubject();
          },
          (error) => {
            console.log('Erreur! :' + error);
          }
        );
    }

    // Les données reçues par le service sont émises par le Subject et cette méthode est appelée dans toutes les autres qui en dépendent
    emitAppareilSubject(){
      this.appareilsSubject.next(this.appareils.slice());
    }
    
    switchOnAll(){
      for(let appareil of this.appareils){
        appareil.status = 'allumé';
      }
      this.emitAppareilSubject();
    }

    switchOffAll(){
      for(let appareil of this.appareils){
        appareil.status = 'éteint';
        this.emitAppareilSubject();
      }
    }

    switchOnOne(i: number){
      this.appareils[i].status ='allumé';
      this.emitAppareilSubject();
    }
    
    switchOffOne(i: number){
      this.appareils[i].status ='éteint';
      this.emitAppareilSubject();
    }

    getAppareilById(id: number) {
      const appareil = this.appareils.find(
        (s) => {
          return s.id === id;
        }
      );
      return appareil;
  }

  addAppareil(name: string, status: string){
    const appareilObject = {
      id: 0,
      name: '',
      status: ''
    };
    appareilObject.name = name;
    appareilObject.status = status;
    appareilObject.id = this.appareils[(this.appareils.length -1)].id +1;
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();

  }
}