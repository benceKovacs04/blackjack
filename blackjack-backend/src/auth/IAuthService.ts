export interface IAuthService {
    signIn(username: string, password: string): any;
    signUp(username: string, password: string): any;
}