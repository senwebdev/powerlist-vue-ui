# powerlist_web_ui

## Architecture

Architecture decisions are described in Architecture Design Review (adr) documents.
Found in [arch](arch).


## Dependencies

The technologies used in this repo are

Technology | Description
-----------|------------
[Typescript](https://www.typescriptlang.org/) | Typescript is used to maintain high code quality and explictily define the shape of data
[vue](https://vuejs.org/) | Framework used to build component based UI
[ag-grid](https://www.ag-grid.com/) | Grid renderer to display and interact with data
make | Provides a standard entry point to interact with the repository
[js-yaml](https://www.npmjs.com/package/js-yaml) | Parse config files for environment specific values.


## Code quality

To maintain a high level of code quality git hooks run linting on every commit
and lint and tests on push. Please respect these tests and fix any errors they report. This will keep the repository consistent and easy for people to jump
in and work on.

Typescript also helps in this effort. So please do not ignore Typescript errors
and strive to fix all that appear.


## Project setup
```
make install
```

### Compiles and hot-reloads for development
```
make serve
```

### Compiles and minifies for production
```
make build
```

### Run your tests
```
make test
```

### Lints and fixes files
```
make lint
```

### Run your unit tests
```
make test_unit
```

## Using local REST server

This repository is configured to load data from a local REST server

To run a local REST server follow the following steps:

```
git clone https://gitlab.activeprime.com/apps/pl/powerlist_app.git
cd powerlist_app
source activate_venv.sh
make serve
```

Then in another console start the dev ui server.

NOTE:
To work locally with static data, edit [.env.development](.env.development)
and uncomment the line VUE_APP_USE_STATIC=yes

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
"# vue_powerlist_ui" 
"# vue_powerlist_ui" 
