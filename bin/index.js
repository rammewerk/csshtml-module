#! /usr/bin/env node
const fs = require('fs');
const {program} = require('commander');

program
    .version(require('../package').version)
    .description(require('../package').description + '\n\nUSAGE: csshtml-module -i [inputFile] -o [outputFile]')
    .requiredOption('-i, --input <file>', 'input file to convert (required)')
    .requiredOption('-o, --output <file>', 'destination file. Should end with .ts or .js (required)')
    .option('-n, --name <string>', 'the name of the JS constant')
    .option('-d, --delay <int>', 'the time, in milliseconds, that the script should wait before compiling')
    .option('-l, --language <string>', 'typehint the language - to help IDE\'s understand the content' )
    .parse(process.argv);


/**
 * Get file content
 * @param {string} file
 * @returns {string}
 */
function fileContent(file) {
    return fs.readFileSync(file, 'utf-8');
}

/**
 * Create js/ts module content
 * @param {{inputFile: string, outputFile: string, language: (any|string), type: string}} s
 * @param {string} content
 * @returns {string}
 */
function template(s, content) {
    let temp = '';
    if (s.language) temp += `// language=${s.language}\r\n`;
    if (s.type === 'ts') {
        temp += `export const ${s.name}: string = \`${content}\`;`;
    } else {
        temp += `export const ${s.name} = \`${content}\`;`;
    }
    return temp;
}

/**
 * Convert settings and content to output file
 *
 * @param {{inputFile: string, outputFile: string, language: (any|string), type: string}} s
 */
function convert(s) {
    const content = fileContent(s.inputFile);
    fs.writeFile(s.outputFile, template(s, content), (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Converted file complete: ${s.outputFile}`);
    });
}

/**
 * Settings default
 *
 * @type {{inputFile: string, outputFile: string, delay: (any|number), language: string, type: string}}
 */
const settings = {
    inputFile: program.getOptionValue('input'),
    outputFile: program.getOptionValue('output'),
    language: program.getOptionValue('language'),
    name: program.getOptionValue('name') || 'css',
    type: program.getOptionValue('output').endsWith('.ts') ? 'ts' : 'js',
    delay: program.getOptionValue('delay') || 5
};

setTimeout(() => convert(settings), settings.delay);
