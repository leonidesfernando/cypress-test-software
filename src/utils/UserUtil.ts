import { Configurations } from "../model/Configurations";
import { User } from "../model/User";

const USER = 'User';
const PASSWORD = 'Password';
const VALID_USER = '@ValidUser';
const VALID_PASSWORD = '@ValidPassword';

export const UserUtil = {

  getUserByParam(config: Configurations, params:any): User{
    const user: string = getUserName(config, params[USER]);
    const password: string = getPassword(config, params[PASSWORD]);

    return new User(user, password);
  },

  isValidCredentials(params: any): boolean{
    return isValidUserName(params[USER]) && isValidPassword(params[PASSWORD]);
  }
}

function isValidUserName(userName:string): boolean {
  return userName === VALID_USER;
}

function isValidPassword(password:string): boolean {
  return password === VALID_PASSWORD;
}

function getUserName(config: Configurations, userName: string): string{
  if(isValidUserName(userName)){
    return config.getUser().getUsername();
  }
  return config.getInvalidUser().getUsername();
}

function getPassword(config: Configurations, password: string): string{
  if(isValidPassword(password)){
    return config.getUser().getPassword();
  }
  return config.getInvalidUser().getPassword();
}
