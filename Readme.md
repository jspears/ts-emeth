TS-Emeth
===
Tool for creating types for css modules with typescript typing and emeth.

![Node.js CI](https://github.com/jspears/ts-emeth/workflows/Node.js%20CI/badge.svg)

## Usage
Run it as a background process

```sh
$ yarn run tse -w ./src/**/*.cssm
```

or in a single shot
```sh
$ yarn run tse ./src/**/*.cssm
```

## Help
```sh
$ yarn run tse -h
```


## Run with mrbuilder
Add ts-emeth as a mrbuilder plugin before the `@mrbuilder/plugin-css`.   Order 
unfortunately matters.

```json

 "mrbuilder": {
    "plugins": [
      "@mrbuilder/plugin-emeth",
      [
        "@mrbuilder/plugin-css",
        {
          "modules": "/\\.cssm$/"
        }
      ],
      "ts-emeth",
      [
        "@mrbuilder/plugin-typescript",
        {
          "useBabel": true
        }
      ]
    ]
  }

```
## Run with postcss
Add the ts-emeth as a plugin for postcss.

```js

  postcss.plugins([...,require('ts-emeth')()]).process('css');
```



