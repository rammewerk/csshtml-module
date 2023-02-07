#! /usr/bin/env node
const fs = require('fs');
const {program} = require('commander');

program
    .version(require('../package').version)
    .description('A CLI tool to convert files into javascript export module strings')
    .requiredOption('-i, --input <file>', 'input file')
    .requiredOption('-o, --output <file>', 'output file')
    .option('-n, --name <string>', 'const name of export')
    .option('-d, --delay <int>', 'delay before running script')
    .option('-l, --language <string>', 'Typehint language in JS')
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
