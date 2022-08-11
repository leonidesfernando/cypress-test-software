/// <reference types="cypress" />

import { EntryListAction } from '../../dist/actions/EntryListAction'
import { DataGen } from "../../dist/utils/DataGen";


let CATEGORIES = ['ALIMENTACAO', 'SALARIO', 'LAZER'
                  , 'TELEFONE_INTERNET', 'CARRO', 'EMPRESTIMO'
                  , 'INVESTIMENTOS', 'OUTROS']


/*-----------------------------------------------
 *  # Ordinay functions
 -------------------------------------------------*/
function getCategory(){
  let index = DataGen.numberByRange(CATEGORIES.length);
  return CATEGORIES[index];
}


beforeEach(() =>{
  cy.goHome();
})


describe('Entry CRUD', () => {


  context('CRUD - Create a new entry, find and edit, find and remove ', () => {

    let date = DataGen.strDateCurrentMonth();
    let description = `${DataGen.productName()} on ${date}`;
    let value = DataGen.moneyValue();

    let entryList = new EntryListAction();


    context('Creating a new entry', () => {

      it('Create valid entry', () => {
      
          entryList.newEntry()
            .and()
          .saveEntry(description, date, value, getCategory())
        })
        
        it('Finding the entry just added', () => {
          entryList.findEntry(description)
      })
    })

    context('Editing and removing the just added: ' + description, () => {

      let editedDescription = description;
      it('Finding the entry just added', () => {
        
        entryList.findEntry(editedDescription);

        editedDescription += ' Edited';
        entryList.openFirstToEdit()
          .saveEntry(editedDescription, date, value, getCategory());

        entryList.findEntry(editedDescription)
      })

      it('Removind the edited entry: ' + editedDescription, () =>{

        entryList.findEntry(editedDescription);
        entryList.removeFirstEntry(editedDescription);
      })
    })
  
  })


  it('Try to create a invalid entry', () => {

    let value = DataGen.moneyValue();
    let date = DataGen.strDateCurrentMonth();

    let entryList = new EntryListAction();
    entryList.newEntry()
      .and()
      .trySaveWithoutDescription(date, value, getCategory());
  })
  
})
