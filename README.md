# Practice_Test_Automation


## Necessary Dependencies
Install the following:
**Node.js** (v16 or later)
**npm** (v8 or later)
**Playwright** (latest)



## Setup Instructions
### Initialize Playwright project (single setup command)
npx init playwright@latest



## Execution Steps
### Run all test cases
npx playwright test
### Run only the login test spec file
npx playwright test tests/loginCombined.spec.js --headed
### View Playwright HTML report
npx playwright show-report

