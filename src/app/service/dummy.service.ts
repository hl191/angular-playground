import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Name} from "./name";

@Injectable({
    providedIn: 'root'
})
export class DummyService {

    getName(): Observable<Name> {
        return of({firstName: "Peter", lastName: "Parker"});
    }
}
