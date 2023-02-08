# CSS/HTML to JS/TS module

⚡ Easily compile **CSS**, **HTML**, or other files into **JavaScript**/**TypeScript** modules with this CLI tool.

<br>

Automatically convert files 👇🏻

```css
button {
    background-color: red;
}
```

Into exportable constants modules in JavaScript/Typescript 👇🏻

```ts
// language=css
export const css: string = `button {
    background-color: red;
}`;
```

And use them through normal `import` statement in JS/TS 🔥

```ts
import {css} from './button.style.js'

const style = document.createElement('style');
style.innerHTML = css;
```


## Developed as a helper tool for Web Components 👌🏻

This CLI tool was created to simplify web component development.

With IDE's like IntelliJ PHPStorm you can set up **File Watchers** to automatically compile
**CSS** and **HTML** to usable TypeScript/JavaScript modules.

**Example:** Use **File Watchers** in **PHPStorm** to compile SCSS to CSS
automatically on new changes. Then convert **CSS** with **Autoprefixer** and
**CSS Optimizer** on external changes - and finally, compile the css-file to a TypeScript/JavaScript module that
you can easily import into your web component file.

**PHPStorm File Watchers settings**

![PHPStorm File Watchers Example](https://https://github.com/rammewerk/csshtml-module/.github/readme/file-watcher-example.png?raw=true)

## Usage

```
Usage:

    csshtml-module -i [inputFile] -o [outputFile]

Options:
  -V, --version               output the version number
  -i, --input <file>          input file (required)
  -o, --output <destination>  output file (required)
  -n, --name                  const name of export
  -d, --delay <time>          the time, in milliseconds that the script should wait before compiling.
  -l, --language              typehint the language for the constant
  -h, --help                  display help for command
```

## Example
In terminal:
```shell
csshtml-module  -i buttons.html  -o buttons.html.ts  --n ButtonHtml  --l html
```

Which will convert this `buttons.html` file 👇🏻

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
* If the new file ends with `.js`, it will create a JavaScript valid file. If `ts` it will create a TypeScript file.
* If `language` is defined, it will include a comment to help the IDE understand the content of the string
* If you are using other compilers and want to delay the execution of this CLI compiler, use the `delay` option.
* You can use any file types you'd like, as long as it can be used in a string variable in JS/TS.
