import * as genData from "@faker-js/faker";

export const DataGen = {
  productName(): string {
    return `Cypress: ${genData.faker.commerce.product()}`;
  },

  strDateCurrentMonth(): string {
    let now = new Date();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    return `${toDateFormat(getDayByMonth(month))}/${toDateFormat(month)}/${year}`;
  },

  moneyValue(): string {
    return new Intl.NumberFormat('pt-BR',
        { style: 'currency', currency: 'BRL' })
      .format(this.number());
  },

  number(): number {
    return this.numberByRange(1000);
  },

  numberByRange(max: number): number {
    return Math.floor(Math.random() * max)
  }
};

function getDayByMonth(month: number) {
  var months31Days = [1, 3, 5, 7, 8, 10, 12];

  var day = 0;
  while (day == 0) {
    day = (month == 2) ? DataGen.numberByRange(28) :
      months31Days.includes(month) ? DataGen.numberByRange(31) : DataGen.numberByRange(30);
  }
  return day;
}

function toDateFormat(value: number) {
  if (value < 10)
    return '0' + value;
  return '' + value;
}
