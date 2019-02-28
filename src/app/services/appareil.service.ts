import { Subject } from 'rxjs';

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

    // Les données reçues par le service sont émises par le Subject et cette méthode est appelée dans toutes les autres qui en dépendent
    emitAppareilSubject(){
      this.appareilsSubject.next(this.appareils.slice());
    }
    
    switchOnAll(){
      for(let appareil of this.appareils){
        appareil.status = 'allumé';
      }
    }

    switchOffAll(){
      for(let appareil of this.appareils){
        appareil.status = 'éteint';
      }
    }

    switchOnOne(i: number){
      this.appareils[i].status ='allumé';
    }
    
    switchOffOne(i: number){
      this.appareils[i].status ='éteint';
    }

    getAppareilById(id: number) {
      const appareil = this.appareils.find(
        (s) => {
          return s.id === id;
        }
      );
      return appareil;
  }
}