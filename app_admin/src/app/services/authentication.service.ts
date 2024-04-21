import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User} from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Setup the storage and service access. 
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}
  
  // Variable to handle Authentication Responses 
  authResp: AuthResponse = new AuthResponse();

  // Get our token from our Storage provider.
  // NOTE: For this application we have decided that we will name
  // the key for our token 'travlr-token'
  public getToken(): string {
    let out: any;
    out = this.storage.getItem('travlr-token');
    // Make sure we return a string even if we don't have a token
    if (!out) {
      return '';
    }
    return out;
  }
  // Save our token to our Storage provider.
  // NOTE: For this application we have decided that we will name
  // the key for our token 'travlr-token'
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }
  // Logout of our application and remove the JWT from Storage
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // Boolean for checking that user is logged in and session/token is valid.
  // reauthenticate if the toke has expired.
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) { 
      const payload =  JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() /1000);
    }
    else {
      return false;
    }
  }

  // Method for retrieving the current user and should be called only after the
  // method isLoggedIn() has been completed(true).
  public getCurrentUser(): User {
    const token: string = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }

  // Login method uses the login methofd from tripDataService
  /* which returns an observable that we can subscribe to. */
  public login(user: User, passwd: string) : void {
    this.tripDataService.login(user, passwd).subscribe({
      next: (value: any) => {
        if(value) {
          console.log(value);
          this.authResp = value;
          this.saveToken(this.authResp.token);
        }
      }, 
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
  }

  /* Similar to the login method but is used for new user registration */
  public register(user: User, passwd: string) : void {
    this.tripDataService.register(user, passwd).subscribe({
      next: (value: any) => {
        if (value) {
          console.log(value);
          this.authResp = value;
          this.saveToken(this.authResp.token);
        }
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
  }
  


}