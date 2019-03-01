import { User } from '../models/User.model';
import { Subject } from 'rxjs';

export class UserService{
    // array privé d'objets de type personnalisé User
    private users: User[] = [];
    // Subject pour émettre cet array
    userSubject = new Subject<User[]>();

    //Méthode déclenchant le subject
    emitUsers(){
        this.userSubject.next(this.users.slice());
    }

    //ajout d'un user à l'array et déclenche le subject
    addUser(user: User){
        console.log(user);
        this.users.push(user);
        this.emitUsers();
    }
}