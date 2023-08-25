import { EntryAction } from "../actions/EntryAction";
import { EntryListAction } from "../actions/EntryListAction";
import { DataGen } from "./dataGen";

export const CrudUtils = {
    genCrudData (): any{
        let data = {date: '', description: '', value: '', category: '', typeEntry: ''};

        data.date = DataGen.strDateCurrentMonth();
        data.description = `${DataGen.productName()} on ${data.date} in ${Cypress.browser.name}`;
        data.value = DataGen.moneyValue();
        data.category = DataGen.getCategory();
        data.typeEntry = DataGen.getTipoLancamento(data.category);

        return data;
    },

    addEntry(entryListAction: EntryListAction): any{
        const data:{date:'', description:'', value:'', category:'', typeEntry:''} = CrudUtils.genCrudData();
        let entryPage = entryListAction.newEntry();
        entryPage.saveEntry(data.description, data.date, data.value, data.category, data.typeEntry);
        return data;
    }
};