#! /usr/bin/env node
const fs = require('fs');
const {program} = require('commander');


/*
|--------------------------------------------------------------------------
| Settings
|--------------------------------------------------------------------------
*/

program
    .version(require('../package').version)
    .description(require('../package').description + '\n\nUSAGE: csshtml-module -i [inputFile] -o [outputFile]')
    .option('-i, --input <file>', 'single file to convert - ignored if --template is set')
    .requiredOption('-o, --output <file>', 'destination file. Should end with .ts or .js (required)')
    .option('    --template', 'compiles to a HTMLTemplate module')
    .option('-d, --delay <int>', 'time, in milliseconds, that the script should wait before compiling.')
    .option('-n, --name <string>', 'name of the JS constant - ignored if --template is set')
    .option('--html <string>', 'html file to use in template')
    .option('--css <string>', 'css file to use in template ')
    .parse(process.argv);


const settings = {
    input: program.getOptionValue('input'),
    output: program.getOptionValue('output'),
    name: program.getOptionValue('name') || 'content',
    typescript: program.getOptionValue('output').endsWith('.ts'),
    delay: program.getOptionValue('delay') ? parseInt(program.getOptionValue('delay')) : 5,
    isTemplate: !!program.getOptionValue('template'),
    html: program.getOptionValue('html'),
    css: program.getOptionValue('css')
};


/**
 * Check if file exists and is readable
 *
 * @param filepath
 * @returns {boolean}
 */
function fileExists(filepath) {
    let flag = true;
    try {
        fs.accessSync(filepath, fs.constants.F_OK);
    } catch (e) {
        flag = false;
    }
    try {
        fs.accessSync(filepath, fs.constants.R_OK);
    } catch (e) {
        flag = false;
    }
    return flag;
}


/*
|--------------------------------------------------------------------------
| Validate input
|--------------------------------------------------------------------------
*/

/** Validate output */
if (!settings.output.endsWith('.ts') && !settings.output.endsWith('.js')) {
    throw new Error('Output file must end with .ts or .js');
}

/** Make sure input file is defined if not --template is specified */
if (!settings.isTemplate && !settings.input) {
    throw new Error('Either --input or --template must be specified');
}

/** Make sure input file exists if not --template is specified */
if (!settings.isTemplate && !fileExists(settings.input)) {
    throw new Error(`${settings.input} file does not exist or is not readable`);
}

if (settings.isTemplate) {
    /** Make sure either --css or --html is specified if --template is specified */
    if (!settings.css && !settings.html) {
        throw new Error(`Either a --css or --html file must be specified when using --template`);
    }

    /** Make sure either --css or --html exists if --template is specified */
    if ((settings.css && !fileExists(settings.css)) && (settings.html && !fileExists(settings.html))) {
        throw new Error(`Either a --css or --html file does not exist or is not readable`);
    }
}


/*
|--------------------------------------------------------------------------
| Generate output
|--------------------------------------------------------------------------
*/

/**
 * Get file content
 * @param {string} file
 * @returns {string}
 */
function fileContent(file) {
    if (!fileExists(file)) return '';
    return fs.readFileSync(file, 'utf-8').trim();
}

/**
 * Create js/ts module with single type
 * @param s
 * @returns {string}
 */
function single(s) {
    let lang = s.input.split('.').pop();
    if (s.typescript) return `// language=${lang}\nexport const ${s.name}: string = \`${fileContent(s.input)}\`;`;
    return `// language=${lang}\nexport const ${s.name} = \`${fileContent(s.input)}\`;`;
}


/**
 * Create js/ts module with template
 * @param s
 * @returns {string}
 */
function template(s) {
    const content = `<style>${fileContent(s.css)}</style>${fileContent(s.html)}`.replace('<style></style>', '');
    if (s.typescript) return `export const template: HTMLTemplateElement = document.createElement('template');\ntemplate.innerHTML = \`${content}\`;`;
    return `export const template = document.createElement('template');\ntemplate.innerHTML =\`${content}\`;`;
}


/**
 * Create js/ts module content
 */
setTimeout(() => {
    fs.writeFile(settings.output, settings.isTemplate ? template(settings) : single(settings), (err) => {
        if (err) throw err;
        console.log(`Converted file complete: ${settings.output}`);
    });
}, settings.delay);
