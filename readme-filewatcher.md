# How to set up the CLI to compile with File Watchers in JetBrains IDE.

*Disclaimer: I have only done this in PHPStorm - but I believe this should work in WebStorm as well*.

Here's how I set up the File Watcher to compile a CSS file to ES6 module with `csshtml-module` CLI.

![PHPStorm File Watchers Example](https://github.com/rammewerk/csshtml-module/blob/main/.github/readme/file-watcher-example.png?raw=true)

* File type: Is the type of files to watch.
* Scope - You should define a scope so you only compile files you want to be compiled.
* Program: `csshtml-module`
* Arguments: Set up the options for this CLI tool to get the result you want. Examples below.
* Output paths to refresh: Should be the same as the output file from `csshtml-module`.
* Working directory: Should be `$FileDir$`.
* I like to keep the **Advanced options** to only *Trigger the watcher on external changes*, because I use SCSS and
  another compiler to compile it down to CSS.

## Arguments - Single files

### CSS watcher

```shell
-i $FileName$ -o $FileNameWithoutExtension$.style.ts --name css --delay 500
```

Delay is because I want to wait for Autoprefixer and CSSO.

### HTML watcher

```shell
-i $FileName$ -o $FileNameWithoutExtension$.html.ts --name html
```

---

## Arguments - Template compuler
I only use this, instead of single modules - because it generates only one file.

### Trigger for changes in HTML files

````shell
--template --html $FileName$ --css $FileNameWithoutExtension$.css -o $FileNameWithoutExtension$.template.ts --delay 500
````

### Template Compiler - triggered by changes in CSS files
````shell
--template --css $FileName$ --html $FileNameWithoutExtension$.html -o $FileNameWithoutExtension$.template.ts --delay 500
````
