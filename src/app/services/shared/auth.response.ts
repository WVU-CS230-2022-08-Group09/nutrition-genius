//Interface: AuthResponse
//Written By: Jacob Ochsenbein
//Summary: Simple interface for the AuthService that user registration and login tokens, as well as the email and password
export interface AuthResponse{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
}
