const report = require('multiple-cucumber-html-reporter')
const dayjs = require('dayjs')
const fs = require('fs')

const baseReportPath = './cypress/cucumber-report'

const data = fs.readFileSync(`${baseReportPath}/results.json`, { encoding: 'utf8', flag: 'r' })
const runInfo = JSON.parse(data)

const osName = () => {
  switch (runInfo.osName) {
    case 'darwin':
      return 'osx'
    case 'win32':
      return 'windows'
    case 'ubuntu':
      return 'ubuntu'
    default:
      console.log('Undefined browser')
  }
}
/*
ajsutar o path dos arquivos json e message e script pra limpar
https://github.com/burakkaygusuz/cypress-cucumber-html-report-example/blob/master/package.json
https://github.com/burakkaygusuz/cypress-cucumber-html-report-example
https://github.com/burakkaygusuz/cypress-cucumber-html-report-example/blob/master/cypress.report.js
https://github.com/burakkaygusuz/cypress-cucumber-html-report-example/blob/master/cypress.config.js

https://fireflysemantics.medium.com/delete-folder-with-npm-script-12e8e3658b77
*/

report.generate({
  jsonDir: `${baseReportPath}/json`,
  reportPath: baseReportPath,
  metadata: {
    browser: {
      name: runInfo.browserName,
      version: runInfo.browserVersion
    },
    device: 'Local Test Machine',
    platform: {
      name: osName(),
      version: runInfo.osVersion
    }
  },
  customData: {
    title: 'Run Info',
    data: [
      { label: 'Project', value: 'Simple Webb App' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Cypress Version', value: runInfo.cypressVersion },
      { label: 'Node Version', value: runInfo.nodeVersion },
      {
        label: 'Execution Start Time',
        value: dayjs(runInfo.startedTestsAt).format('YYYY-MM-DD HH:mm:ss.SSS')
      },
      {
        label: 'Execution End Time',
        value: dayjs(runInfo.endedTestsAt).format('YYYY-MM-DD HH:mm:ss.SSS')
      }
    ]
  },
  disableLog: true,
  pageTitle: "Cypress Cucumber Html Report - LFO's lab",
  openReportInBrowser: true,
  displayDuration: true
})
