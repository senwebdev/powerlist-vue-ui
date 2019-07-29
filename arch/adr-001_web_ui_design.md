# ADR 001: Web UI Design

## Context

This repository provides a single page web app to interact with and manage
the ActivePrime Powerlist product.

It will be developed my many individual contributors mainly distributed
around the world.

## Decision

The UI will be built using components to keep code independent and reusable.
Vue framework is used for component management. Components will have a well defined
purpose and composition should be used over copying functionality.

This keeps the UI flexible by allowing changes to be made uniformly across the whole
UI by changing a single code location.

Typescript is used to further clarify the relationships between components
and to prevent errors resulting from data changes.

Git hooks have been put in place to run linting on every commit and to run tests
before pushing changes. This is not meant to hinder development but to introduce
the habit of linting and testing the code often.

### Data sources

Data to populate the UI will be fetched from a REST api. The URL which should
be used to access the REST server will be defined in a config_web_ui.yaml file.
The REST resourcese and json schemas for the request and response types will be provided.

## Status


## Consequences