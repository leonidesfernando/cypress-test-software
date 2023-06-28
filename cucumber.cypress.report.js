const report = require('multiple-cucumber-html-reporter');
const dayjs = require('dayjs');
const fs = require('fs');

const baseReportPath = './cypress/cucumber-report';


const data = fs.readFileSync(`${baseReportPath}/results.json`, { encoding: 'utf8', flag: 'r' });
const runInfo = JSON.parse(data);
console.log(runInfo)

const osName = () => {
  switch (runInfo['osName']) {
    case 'darwin':
      return 'osx';
    case 'win32':
      return 'windows';
    case 'ubuntu':
      return 'ubuntu';
    default:
      console.log('Undefined browser');
  }
};

report.generate({
  jsonDir: `${baseReportPath}/json`,
  reportPath: baseReportPath,

});
/*
report.generate({
  jsonDir: baseReportPath,
  reportPath: baseReportPath,
  metadata: {
    browser: {
      name: 'chrome',
      version: 'last',
    },
    device: 'Local Test Machine',
    platform: {
      name: osName(),
      version: 'nao sei',
    },
  },
  customData: {
    title: 'Run Info',
    data: [
      { label: 'Project', value: 'Simple Webb App' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Cypress Version', value: '12.15' },
      { label: 'Node Version', value: 'v18.13.0' },
      {
        label: 'Execution Start Time',
        
      },
      {
        label: 'Execution End Time',
        
      },
    ],
  },
  disableLog: true,
  pageTitle: "Cypress Cucumber Html Report - LFO's lab",
  openReportInBrowser: true,
  displayDuration: true,
});*/