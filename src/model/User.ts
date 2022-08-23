
export class User{
    private username:string;
    private password:string;

    constructor(username:string, password:string){
        expect(username).not.empty
        expect(password).not.empty
        this.username = username;
        this.password = password;
    }
    
    public getUsername(): string{
        return this.username;
    }

    public getPassword(): string{
        return this.password;
    }
}