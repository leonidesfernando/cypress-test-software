import { Configurations } from "../model/Configurations";
import { User } from "../model/User";

export const LoadConfigData ={
    loadData(data: any): Configurations {
        expect(data).not.null
        let config: Configurations = new Configurations(new User(data.username, data.password))
        return config;
    }
}