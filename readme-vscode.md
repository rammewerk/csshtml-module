# How to set up `csshtml-module` CLI to auto-compile CSS and HTML to JavaScript modules in Visual Studio Code.

*Disclaimer: I'm not usually a VSCode user, but this how I got it to work similar to how I use PHPStorm.*

### Install the File Watcher plugin for VSCode
Get it here 👉 [File Watcher](https://marketplace.visualstudio.com/items?itemName=Appulate.filewatcher)


## The .vscode/settings.json config
You probably don't want to use both single file and template compiler. So remove the ones you don't want to include.
```json
{
  "filewatcher.commands": [
    {
      /** Compile CSS to single modules */
      "match": ".*\/components\/.*\\.css",
      "cmd": "csshtml-module -i ${file} -o ${fileDirname}/${fileBasenameNoExt}.style.js --name css",
      "event": "onFileChange"
    },
    {
      /** Compile HTML to single modules */
      "match": ".*\/components\/.*\\.html",
      "cmd": "csshtml-module -i ${file} -o ${fileDirname}/${fileBasenameNoExt}.html.js --name html",
      "event": "onFileChange"
    },
    {
      /** Compile to template on HTML changes */
      "match": ".*\/components\/.*\\.html",
      "cmd": "csshtml-module --template --html ${file} --css ${fileDirname}/${fileBasenameNoExt}.css -o ${fileDirname}/${fileBasenameNoExt}.template.js",
      "event": "onFileChange"
    },
    {
      /** Compile to template on CSS changes */
      "match": ".*\/components\/.*\\.css",
      "cmd": "csshtml-module --template --css ${file} --html ${fileDirname}/${fileBasenameNoExt}.html -o ${fileDirname}/${fileBasenameNoExt}.template.js",
      "event": "onFileChange"
    },
  ]
}
```

## How it works

![VSCode in action](https://github.com/rammewerk/csshtml-module/blob/main/.github/readme/vscode.gif?raw=true)


This is the simple Web Component used in the example GIF.
```js
import {template} from "./my-button.template.js";

class MyButton extends HTMLElement {

    constructor() {
        super(), this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

}

window.customElements.define('my-button', MyButton);
```
And this the content of the index.html page - which is quite simple:
```html
<my-button></my-button>
<script type="module" src="components/buttons/my-button.js"></script>
```