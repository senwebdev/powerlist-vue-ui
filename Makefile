.PHONY : help install test test_unit lint build serve clean

all: help

help:
	@echo "make install                  Install dependencies."
	@echo "make test                     Runs all tests."
	@echo "make test_unit                Runs all unit tests."
	@echo "make lint                     Runs linter on code to enforce style standards."
	@echo "make build                    Builds output into dist folder."
	@echo "make serve                    Run development server."
	@echo "make clean                    Removes (cleans out) all generated files."


install:
	yarn

test:
	yarn test

test_unit:
	yarn test:unit

lint:
	yarn lint

build:
	yarn build

serve:
	yarn serve

clean:
	rm -fr dist
