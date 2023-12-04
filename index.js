// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const githubLicenseBadges = ['[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
    '[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)',
    '[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)',
    '[![License](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)',
    '[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)',
    '[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)',
    '[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC_BY--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)',
    '[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC_BY--NC_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)',
    '[![License: CC BY-ND 4.0](https://img.shields.io/badge/License-CC_BY--ND_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nd/4.0/)',
    '[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)',
    '[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC_BY--NC--ND_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)',
    '[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)',
    '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
    '[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)',
    '[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)',
    '[![License: LGPL v3](https://img.shields.io/badge/License-LGPL_v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)',
    '[![License: FDL 1.3](https://img.shields.io/badge/License-FDL_v1.3-blue.svg)](https://www.gnu.org/licenses/fdl-1.3)',
    '[![License: Hippocratic 2.1](https://img.shields.io/badge/License-Hippocratic_2.1-lightgrey.svg)](https://firstdonoharm.dev)',
    '[![License: Hippocratic 3.0](https://img.shields.io/badge/License-Hippocratic_3.0-lightgrey.svg)](https://firstdonoharm.dev)',
    '[![License: IPL 1.0](https://img.shields.io/badge/License-IPL_1.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)',
    '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)',
    '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
    '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)',
    '[![License: Open Data Commons Attribution](https://img.shields.io/badge/License-ODC_BY-brightgreen.svg)](https://opendatacommons.org/licenses/by/)',
    '[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)',
    '[![License: ODbL](https://img.shields.io/badge/License-PDDL-brightgreen.svg)](https://opendatacommons.org/licenses/pddl/)',
    '[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)',
    '[![License: Artistic-2.0](https://img.shields.io/badge/License-Artistic_2.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)',
    '[![License: Open Font-1.1](https://img.shields.io/badge/License-OFL_1.1-lightgreen.svg)](https://opensource.org/licenses/OFL-1.1)',
    '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)',
    '[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)',
    '[![License: Zlib](https://img.shields.io/badge/License-Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)',
    '']
const githubLicenses = ['Apache 2.0 License',
    'Boost Software License 1.0',
    'BSD 3-Clause License',
    'BSD 2-Clause License',
    'CC0',
    'Attribution 4.0 International',
    'Attribution-ShareAlike 4.0 International',
    'Attribution-NonCommercial 4.0 International',
    'Attribution-NoDerivates 4.0 Internationa',
    'Attribution-NonCommmercial-ShareAlike 4.0 International',
    'Attribution-NonCommercial-NoDerivatives 4.0 International',
    'Eclipse Public License 1.0',
    'GNU GPL v3',
    'GNU GPL v2',
    'GNU AGPL v3',
    'GNU LGPL v3',
    'GNU FDL v1.3',
    'The Hippocratic License 2.1',
    'The Hippocratic License 3.0',
    'IBM Public License Version 1.0',
    'ISC License (ISC)',
    'The MIT License',
    'Mozilla Public License 2.0',
    'Attribution License (BY)',
    'Open Database License (ODbL)',
    'Public Domain Dedication and License (PDDL)',
    'The Perl License',
    'The Artistic License 2.0',
    'SIL Open Font License 1.1',
    'The Unlicense',
    'WTFPL',
    'The zlib/libpng License',
    'No License']
function badgeFunction(license){
    return githubLicenseBadges[githubLicenses.indexOf(license)]}
function tableOfContentsFunction(install, usage, credits, license, features, contribute, test) {
    let ins = ''
    let usa = ''
    let cre = ''
    let lic = ''
    let fea = ''
    let con = ''
    let tes = ''

    if (install !== '') {
        ins = `- [Installation](#installation)\n`
    }
    if (usage !== '') {
        usa = `- [Usage](#usage)\n`
    }
    if (credits !== '') {
        cre = `- [Credits](#credits)\n`
    }
    if (license !== '') {
        lic = `- [License](#license)\n`
    }
    if (features !== '') {
        fea = `- [Features](#features)\n`
    }
    if (contribute !== '') {
        con = `- [How to Contribute](#how-to-contribute)\n`
    }
    if (test !== '') {
        tes = `- [Tests](#tests)\n`
    }

    return `## Table of Contents\n` + ins + usa + cre + lic + fea + con + tes + `- [Questions](#questions)\n`
}
function installationFunction(install) {
    if (install !== '') {
        return `## Installation\n${install}\n`
    }
}
function usageFunction(usage) {
    if (usage !== '') {
        return `## Usage
        ${usage}\n`
    }
}
function creditsFunction(credits) {
    if (credits !== '') {
        return `## Credits\n${credits}\n`
    }
}
function licenceFunction(license) {
    if (license !== '') {
        return `## License\n This project is under ${license} license. Please respect the license that this project has.\n`
    }
}
function featuresFunction(features) {
    if (features !== '') {
        return `## Features\n${features}\n`
    }
}
function contributeFunction(contribute) {
    if (contribute !== '') {
        return `## How to Contribute\n${contribute}\n`
    }
}
function testsFunction(test) {
    if (test !== '') {
        return `## Tests\n${test}\n`
    }
}
function questionsFunction(github, email, instructions) {
    return `## questions\n[${github}](https://github.com/${github})<br />\n${email}<br />\n${instructions}<br />\n`
}

const generateText = ({ title, description, install, usage, credits, license, features, contribute, test, github, email, instructions }) =>
    `# ${title}` + badgeFunction(license) + 
    `\n## Description\n${description}\n` +
    tableOfContentsFunction(install, usage, credits, license, features, contribute, test, github, email, instructions) +
    installationFunction(install) +
    usageFunction(usage) +
    creditsFunction(credits) +
    licenceFunction(license) +
    featuresFunction(features) +
    contributeFunction(contribute) +
    testsFunction(test) +
    questionsFunction(github, email, instructions);



// TODO: Create an array of questions for user input
inquirer
    .prompt([
        {
            message: 'What the title of your project?',
            name: 'title',
        },
        {
            message: 'What is your description of your project?',
            name: 'description',
        },
        {
            message: 'Please list the steps requred to install your project if any.',
            name: 'install',
        },
        {
            message: 'Please explain how to use your your project for the usage section.',
            name: 'usage',
        },
        {
            message: 'Please list any collaborators, third party assets used, or tutorials used for the credits section.',
            name: 'credits',
        },
        {
            type: 'list',
            message: 'Please choose the license used for your project if any.',
            choices: githubLicenses,
            name: 'license',
        },
        {
            message: 'Please provide a list of features if there are several of them in your project',
            name: 'features',
        },
        {
            message: 'Please explain how other can contribute to your project if others can.',
            name: 'contribute',
        },
        {
            message: 'Please provide any tests your project may have here if any.',
            name: 'test',
        },
        {
            message: 'Please enter your github username for a link to you github on the questions page.',
            name: 'github',
        },
        {
            message: 'Please enter your email for the questions page.',
            name: 'email',
        },
        {
            message: 'Please enter instructions on the best way to contact you for the questions page.',
            name: 'instructions',
        },
    ])
    .then((response) => {
        generateREADME = generateText(response)
        fs.writeFile('testREADME.md',
            generateREADME, (error) =>
            error ? console.error(error) : console.log('README file made!'))
    })
// TODO: Create a function to write README file

// TODO: Create a function to initialize app

// Function call to initialize app