
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

    public getWrongPassword(): string{
        return (Math.random()).toString(36).substring(8)
    }

    public getWrongUsername(): string{
        return (Math.random()).toString(36).replace(/[^a-z]+/g,'');
    }
}