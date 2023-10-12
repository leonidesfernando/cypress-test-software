import { User } from "./User";

export class Configurations{
    private user:User;

    private invalidUser: User;

    constructor(user: User){
        this.user = user;
        this.invalidUser = new User('invali$d.', 'invalid93.');
    }

    public getUser(): User{
        return this.user;
    }

    public getInvalidUser(){
        return this.invalidUser;
    }
}

