import { User } from "./User";

export class Configurations{
    private user:User;

    constructor(user: User){
        this.user = user;
    }

    public getUser(): User{
        return this.user;
    }
}

