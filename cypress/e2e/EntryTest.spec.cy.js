/// <reference types="cypress" />

import { EntryListAction } from '../../dist/actions/EntryListAction'
import { DataGen } from "../../dist/utils/DataGen";


let CATEGORIES = ['ALIMENTACAO', 'SALARIO', 'LAZER'
                  , 'TELEFONE_INTERNET', 'CARRO', 'EMPRESTIMO'
                  , 'INVESTIMENTOS', 'OUTROS']

let tiposLancamento = new Map();
tiposLancamento.set(['INVESTIMENTOS','OUTROS'],['TRANSF']);
tiposLancamento.set(['SALARIO', 'OUTROS'], ['RENDA']);
tiposLancamento.set(CATEGORIES.filter(f => f != 'INVESTIMENTOS' || f != 'SALARIO'), ['DESPESA']);

console.log(tiposLancamento)
/*-----------------------------------------------
 *  # Ordinay functions
 -------------------------------------------------*/
function getCategory(){
  return getAny(CATEGORIES);
}

function getTipoLancamento(category){

  for(const [key,value] of tiposLancamento){
    
    if (key.indexOf(category) >= 0) {
      return getAny(value);
    }
  }
  throw Error("Does not exists 'TipoLancamento' for this category " + category);
}


function getAny(list){
  var index = DataGen.numberByRange(list.length);
  if(index == list.length){
    index--;
  }
  return list[index]
}


beforeEach(() =>{
  cy.goHome();
})


describe('Entry CRUD', () => {


  context('CRUD - Create a new entry, find and edit, find and remove ', () => {

    let date = DataGen.strDateCurrentMonth();
    let description = `${DataGen.productName()} on ${date}`;
    let value = DataGen.moneyValue();
    let category = getCategory();
    let typeEntry = getTipoLancamento(category);

    let entryList = new EntryListAction();


    context(`Creating a new entry: ${description}, ${category}, ${typeEntry}`, () => {

      it('Create valid entry', () => {

          entryList.newEntry()
            .and()
          .saveEntry(description, date, value, category, typeEntry)
        })
        
        it('Finding the entry just added', () => {
          entryList.findEntry(description)
      })
    })

    context(`Editing and removing the entry just added: : ${description}, ${category}, ${typeEntry}`, () => {

      let editedDescription = description;
      it(`Finding the entry just added: ${description}`, () => {
        
        entryList.findEntry(editedDescription);

        editedDescription += ' Edited';
        entryList.openFirstToEdit()
          .saveEntry(editedDescription, date, value, category, typeEntry);

        entryList.findEntry(editedDescription)
      })

      it(`Removind the edited entry: ${editedDescription}`, () =>{

        entryList.findEntry(editedDescription);
        entryList.removeFirstEntry(editedDescription);
      })
    })
  
  })


  it('Try to create a invalid entry', () => {

    let value = DataGen.moneyValue();
    let date = DataGen.strDateCurrentMonth();
    let newCategory = getCategory();
    let newTypeEntry = getTipoLancamento(newCategory);

    let entryList = new EntryListAction();
    entryList.newEntry()
      .and()
      .trySaveWithoutDescription(date, value, newCategory, newTypeEntry);
  })
  
})
