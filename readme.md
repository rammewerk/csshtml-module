# CSS/HTML to JS/TS module

⚡ Easily compile **CSS**, **HTML**, or other files into modules that you can import into your **JavaScript** or *
*TypeScript** files.

Created to keep CSS and HTML files as separated files when developing Web Components.

## Install

```
npm install -g csshtml-module
```

## How it works:

You can automatically convert files - like this `button.css` file 👇🏻

```css
button {
    background-color: red;
}
```

into exportable constants modules in JavaScript/Typescript 👇🏻

```ts
// language=css
export const css: string = `button {
    background-color: red;
}`;
```

and use them through normal `import` statement in JavaScript or TypeScript 🔥

```ts
import {css} from './button.style.js'

const style = document.createElement('style');
style.innerHTML = css;
```

## Combine files into a HTML template module for JS

With the new `--template` option, it can compile both CSS and HTML to a template module for Web Components.

Which compiles to this 👇🏻

```ts
export const template: HTMLTemplateElement = document.createElement('template');
template.innerHTML = `
    <style>
        button{
            background-color:red
        }
    </style>
    <button>Hello</button>
`;
```

See a more extended example below

## Developed as a helper tool for Web Components 👌🏻

This CLI tool was created to simplify web component development without the need for WebPack, Rollup and similar tools.
Also, you don't need to fetch HTML/CSS or wait for browsers to support HTML/CSS modules as default.

With IDE's like IntelliJ PHPStorm you can set up **File Watchers** to automatically compile
**CSS** and **HTML** to usable JavaScript modules.

#### Example:

Use **File Watchers** in **PHPStorm** to compile SCSS to CSS
automatically on new changes. Then convert **CSS** with **Autoprefixer** and
**CSS Optimizer** on external changes - and finally, compile the css-file to a TypeScript/JavaScript module that
you can easily import into your web component file.

So, now you can easily just change the SCSS file and it will automatically update the JS code after you saved the
changes.

#### PHPStorm File Watchers settings:

![PHPStorm File Watchers Example](https://github.com/rammewerk/csshtml-module/blob/main/.github/readme/file-watcher-example.png?raw=true)

## Usage

```
Single file compiling:

    csshtml-module -i [inputFile] -o [outputFile]
    
Template file compiling:
 
    csshtml-module --template --css [file] --html [file] -o [template.ts]

Options:
  -V, --version            output the version number.
  -i, --input <file>       input file to convert (will be ignored if --template is set).
  -o, --output <file>      destination file. Should end with .ts or .js (required).
      --template           compile to a web component template containing css and html.
  -d, --delay <int>        the time, in milliseconds, that the script should wait before compiling.
  -n, --name <string>      the name of the JS constant (will be ignored if --template is set).
      --html <string>      html file to use for --template
      --css <string>       css file to use for --template
  -h, --help               display help for command

```

## Example of a single type module

In terminal:

```shell
csshtml-module  -i buttons.html  -o buttons.html.ts  --n ButtonHtml
```

Which will convert your `buttons.html` file 👇🏻

```html
<button type="submit" class="button">Save</button>
```

Into this `buttons.html.ts` file 👇🏻

```ts
// language=html
export const ButtonHtml: string = `<button type="submit" class="button">Save</button>`;
```

Which can be imported as a normal module 👇🏻

```ts
import {ButtonHtml} from './buttons.html.ts'

const template = document.createElement('template');
template.innerHTML = ButtonHtml;
```

* If the ouput file ends with `.js`, it will create a JavaScript valid file. If `ts` it will create a TypeScript file.
* If the `\\ language=html` comment is to help IDE's understand the content.
* If you are using other compilers and want to delay the execution of this CLI compiler, use the `delay` option.
* You can use any file types you'd like, as long as it can be used in a string variable in JS/TS.

## Example for `template` module

In terminal:

```shell
csshtml-module --template  --css buttons.css  --html buttons.html  -o buttons.template.js
```

Which will convert your `buttons.html` file 👇🏻

```html

<button>Hello</button>
```

And your `buttons.css` file 👇🏻

```css
button { background-color: red }
```

Into this `buttons.template.js` file 👇🏻

```ts
export const template = document.createElement('template');
template.innerHTML = `<style>button{background-color:red}</style><button>Hello</button>`;
```

Which can be imported as a normal module 👇🏻

```ts
import {template} from './buttons.template.js'

...
this.shadowRoot.appendChild(template.content.cloneNode(true));
```

**Notice:**
*if the one of the files (css or html) are not yet created, it will only add the HTML or CSS in the template module*

<br>

#### IntelliJ File Watcher arguments for HTML

`--template --html $FileName$ --css $FileNameWithoutExtension$.css -o $FileNameWithoutExtension$.template.ts -d 500`

#### IntelliJ File Watcher arguments for CSS

`--template --css $FileName$ --html $FileNameWithoutExtension$.html -o $FileNameWithoutExtension$.template.ts -d 500`

## Some thoughts on why this CLI tool was created

I wasn't able to find a satisfying solution to keep HTML and CSS separated when I created Web Components.
There
are [solutions like fetching the HTML/CSS](https://stackoverflow.com/questions/73935544/organizing-multiple-web-components-with-seperation-of-concerns/75388024#75388024), 
which I weren't too happy about. Also, some
suggest "[CSS module scripts](https://web.dev/css-module-scripts/)",
but that doesn't seem to work well in Safari (as of february 2023). Some suggest to use Webpack with raw-loader and
Rollup, but I found this to require too much setup unless I wanted to compile every script every time a file changes.

With this setup I'm able to just create a SCSS file and HTML file and the File Watcher will automatically compile on
save.

If you have any other thoughts on how to achieve this without these examples above and without using this CLI tool, I
would love too here from you.

And hopefully we are able to import this in the future with native support for importing CSS and HTML as modules.
