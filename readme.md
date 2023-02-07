# csshtml-module

Easily compile CSS or HTML files to JavaScript/TypeScript modules with this CLI tool.

Developed as a tool to use in File Watcher in PHPStorm to automatically convert css
and HTML to JavaScript/TypeScript exported constants as modules. Which makes it easier
to use CSS and HTML files for developing templates for Web Components.

Example: I will add the stylesheet for web components in SCSS, which will automatically
compile to CSS on save, then this CLI tool will convert the CSS to JS module that I
can import to my web component. Same goes for HTML content inside the HTMLTemplateElement.

## Usage

```
Usage:

    csshtml-module -i [inputFile] -o [outputFile]

Options:
  -V, --version               output the version number
  -i, --input <file>          input file
  -o, --output <destination>  output file
  -n, --name                  const name of export
  -d, --delay <time>          delay before running script
  -l, --language              typehint language for constant
  -h, --help                  display help for command
```

## Example

```shell
csshtml-module -i button.css -o button.style.ts --name css --language css --delay 500
```

Example of input file content

```css
button {
    background-color: red;
}
```

Will output

```ts
// language=css
export const css: string = `button {
    background-color: red;
}`;
```