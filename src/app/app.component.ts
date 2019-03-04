import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppareilService } from './services/appareil.service';
import { Observable, interval, Subscription } from 'rxjs';
import { map, take} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
 
  time;
  counterSubscription: Subscription;

  ngOnInit() {
    const counter = interval(1000);
    const counterConvert = counter.pipe(
      map(timer => {
        let min = Math.floor(timer % 3600 /60);
        let h = Math.floor(timer / 3600);
        let s = Math.floor(timer % 3600 % 60);
        return ('0' + h).slice(-2) + ":" + ('0' + min).slice(-2) + ":" + ('0' + s).slice(-2);
      }
      ),
    )
    this.counterSubscription = counter.subscribe(
      (value) => {
        this.time = value ;
      }, 
      (error) => {
        console.log('Uh-oh, an error occured! : ' + error);

      }, 
      () => {
        console.log('Observable complete!');
      }
    );
  }
  ngOnDestroy(){
    this.counterSubscription.unsubscribe();
  }
}


