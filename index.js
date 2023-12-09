const inquirer = require('inquirer');
const fs = require('fs');

//both githubLicenseBadges and githubLicenses have corresponding index numbers to get the correct badge, dont change one without the same change to the other
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

function badgeFunction(license){//this pulls the correct badge from githubLicenseBadges using the githubLicenses's index
    return githubLicenseBadges[githubLicenses.indexOf(license)]
}
function tableOfContentsFunction(install, usage, credits, license, features, contribute, test) {//this adds each section of the readme to the table of contents. it wont add optional section unluss the user has answered it accordingly 
    let ins = ''
    let usa = ''
    let cre = ''
    let lic = ''
    let fea = ''
    let con = ''
    let tes = ''

    if (install !== '') { //all the if statements are for the optional sections of the readme. if the input by the user was nothing it will not make a section for it. 
        ins = `- [Installation](#installation)\n`
    }
    if (usage !== '') {
        usa = `- [Usage](#usage)\n`
    }
    if (credits !== '') {
        cre = `- [Credits](#credits)\n`
    }
    if (license !== 'No License') {
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
function installationFunction(install) {//this only makes the installation section if the user has some input
    if (install !== '') {
        return `## Installation\n${install}\n`
    } else return `\n`
}
function usageFunction(usage) {//this only makes the usage section if the user has some input
    if (usage !== '') {
        return `## Usage
        ${usage}\n`
    } else return `\n`
}
function creditsFunction(credits) {//this only makes the credits section if the user has some input
    if (credits !== '') {
        return `## Credits \n ${credits} \n`
    } else return `\n`
}
function licenceFunction(license) {//this only makes the section license if they have selected anything but the NO License option
    if (license !== 'No License') {
        return `## License\n This project is under ${license} license. Please respect the license that this project has.\n`
    } else return `\n`
}
function featuresFunction(features) {//this only makes the features section if the user has some input
    if (features !== '') {
        return `## Features\n${features}\n`
    } else return `\n`
}
function contributeFunction(contribute) {//this only makes the how to contribut section if the user has some input
    if (contribute !== '') {
        return `## How to Contribute\n${contribute}\n`
    } else return `\n`
}
function testsFunction(test) {//this only makes the test section if the user has some input
    if (test !== '') {
        return `## Tests\n${test}\n`
    } else return `\n`
}
function questionsFunction(github, email, instructions) {//this makes the questions section no mater the users input
    return `## Questions\n[${github}](https://github.com/${github})<br />\n${email}<br />\n${instructions}<br />\n`
}

const generateText = ({ title, description, install, usage, credits, license, features, contribute, test, github, email, instructions }) => //this puts all the pieces together to make the entire readme page
    `# ${title} ` + badgeFunction(license) + //this makes the title section no mater what but it can have no input and displays the license badge next to the title if the option was selected
    `\n## Description\n${description}\n` + //this makes the description section no mater what but under can be empty if the user wants to write it later.
    tableOfContentsFunction(install, usage, credits, license, features, contribute, test, github, email, instructions) +//the rest is the different pieces but put all the returned information togeter in propper syntax
    installationFunction(install) +
    usageFunction(usage) +
    creditsFunction(credits) +
    licenceFunction(license) +
    featuresFunction(features) +
    contributeFunction(contribute) +
    testsFunction(test) +
    questionsFunction(github, email, instructions);

inquirer
    .prompt([// this is the prompt with all the questionslisted after
        {
            message: 'What is the title of your project?',
            name: 'title',
        },
        {
            message: 'What is your description of your project?',
            name: 'description',
        },
        {
            message: 'Please list the steps requred to install your project if any. (Optional)',
            name: 'install',
        },
        {
            message: 'Please explain to the user how to use your project. (Optional)',
            name: 'usage',
        },
        {
            message: 'Please list any collaborators, third party assets used, or tutorials used for the credits section. (Optional)',
            name: 'credits',
        },
        {
            type: 'list',
            message: 'Please choose the license used for your project if any. (select No License to have no section in readme)',
            choices: githubLicenses,//this calls the global array of licenses to be used as the multiple choice
            name: 'license',
        },
        {
            message: 'Please provide a list of features if there are several of them in your project. (Optional)',
            name: 'features',
        },
        {
            message: 'Please explain how others can contribute to your project if others can. (Optional)',
            name: 'contribute',
        },
        {
            message: 'Please provide any tests your project may have here if any. (Optional)',
            name: 'test',
        },
        {
            message: 'Please enter your github username for a link to your github on the questions page.',
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
    .then((response) => {// this statement makes the readme file and calls the function to put all of the user chosen pieces together in the readme
        generateREADME = generateText(response)
        fs.writeFile('generatedREADME.md', generateREADME, (error) => error ? console.error(error) : console.log('README file made!'))
    })