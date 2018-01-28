
# Cloud Native Filterable Landscape

This is a CNCF project to provide an interactive version of the static landscape from https://github.com/cncf/landscape#current-version.

## Data

The canonical source for all data is [landscape.yml](landscape.yml). Once a day, we download data for projects and companies from the following sources:

* Project info from GitHub
* Funding info from [Crunchbase](https://www.crunchbase.com/)
* Market cap data from Yahoo Finance

The build server enhances the source data with the fetched data and saves the result in [processed_landscape.yml](processed_landscape.yml) and as a JSON [file](https://github.com/cncf/filterable-landscape/blob/master/src/data.json), which is what the app loads to display data.

## Corrections

Please open a pull request with edits to [landscape.yml](landscape.yml). The file [processed_landscape.yml](processed_landscape.yml) is generated and so should never be edited directly.

If the error is with data from [Crunchbase](https://www.crunchbase.com/) you should open an account there and edit the data. If you don't like a project description, edit it in GitHub.

## Specification

* [Kanban](https://github.com/cncf/filterable-landscape/projects/1) of current tasks
* Original [specification](https://docs.google.com/document/d/1QPVrXRjTWDQAwsbgSWutUmteXo0mTXcTvCNlz6qw0Uw/edit)

## Static Landscape

[![CNCF Landscape](https://github.com/cncf/landscape/landscape/CloudNativeLandscape_latest.png)](https://raw.githubusercontent.com/cncf/landscape/master/landscape/CloudNativeLandscape_latest.png)

## Installation

### Install on Mac
1. Install [Homebrew](https://brew.sh/)
2. `brew install node yarn`
3. `git clone git@github.com:cncf/filterable-landscape.git`

### Local development
1. `git pull`
2. `yarn` (installs dependencies)
3. `npm run yaml2json` (after fetching new commits or changing landscape.yml file)
* `yarn open:src` (starts a development server) or
* `yarn open:dist` (compiles and opens a production build)

### Fetching and generating data:
  src/crunchase.csv - download this file from the crunchbase pro account to get latest info
  src/github.json - generate it with `babel-node tools/fetchGithubStats` to get last info
  src/addExternalInfo.js - adds github + crunchbase to /landscape.yml and saves to /processed_landscape.yml
  src/lookup.json - generated during yaml2json, uses only /processed_landscape.yml
  src/data.json - generated during yaml2jsonm, uses only /processed_landscape.yml

### building a dist
   1. `yarn`
   2. `yarn build`
or with npm
   1. `npm run build`

### rebuilding json from yaml and extra info:
   `npm run yaml2json`

### rebuilding images:
   `./node_modules/bin/babel-node tools/fetchImages.js`
