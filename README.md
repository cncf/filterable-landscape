
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

If the error is with data from [Crunchbase](https://www.crunchbase.com/) you should open an account there and edit the data. If you don't like a project description, edit it in GitHub. If your project isn't showing the license correctly, you may need to paste the license into LICENSE file at the root of your project in GitHub, in order for GitHub to serve the information correctly. (It needs to be LICENSE and not LICENSE.txt or LICENSE.code, and the text needs to be the standard license text.)

## Specification

* [Kanban](https://github.com/cncf/filterable-landscape/projects/1) of current tasks
* Original [specification](https://docs.google.com/document/d/1QPVrXRjTWDQAwsbgSWutUmteXo0mTXcTvCNlz6qw0Uw/edit)

## Static Landscape

[![CNCF Landscape](https://raw.githubusercontent.com/cncf/landscape/master/landscape/CloudNativeLandscape_latest.png)](https://github.com/cncf/landscape/landscape/CloudNativeLandscape_latest.png)

## Installation

### Install on Mac
1. Install [Homebrew](https://brew.sh/)
2. `brew install node yarn`
3. `git clone git@github.com:cncf/filterable-landscape.git`

### Local development
1. `git pull`
2. `yarn` (installs dependencies)
* `yarn open:src` (starts a development server) or
* `yarn build`, then `yarn open:dist` (compiles and opens a production build)


### Updating data

The following options go from least data updated to most:
1. `npm run fetch`: Fetches images (saving any changes) and updates processed_landscape.yaml
1. `npm run precommit`: Above plus downloads GitHub info
1. `npm run rebuild`: Above plus deletes all images first

Netlify runs:
1. `npm run prebuild` 

### Data flow
  Nothing is updated automatically during development.
  Overall, the data flow is this:

  landscape.yml => `yarn run babel-node tools/addExternalInfo` => processed_landscape.yml => `yarn yaml2json` => src/data.json + src/lookup.json

  processed_landscape.yml => `yarn run babel-node tools/fetchImages` => src/logos + src/styles/styles.scss + src/image_urls.yml

  `yarn run babel-node tools/addExternalInfo` uses these files:
  1. landscape.yml - our source
  2. github.json - an info about repos, can be obtained via `yarn run babel-node tools/fetchGithubStats`
  3. crunchbase.csv - an info about companies from the crunchbase, should be download manually from a crunchbase pro account
  4. cncf_members.yml - a list of all cncf members.

  `yarn yaml2json` uses this files:
  1. processed_landscape.yml - our source with extra fields from saved 3rd party data.

  `yarn run babel-node tools/fetchImages` uses these files:
  1. processed_landscape.yml - our source with extra fields from saved 3rd party data, so we get a proper company name
  2. src/hosted_logos - some logos are stored locally
  3. src/image_urls.yml - result from a previous run of this command. Saves us a time on image postprocessing

  When you change a code iteslf in tools/fetchImages.js, postprocessing may
  fail, because the file src/image_urls.yml contains the hash for an input image.
  Just run `yarn fetchAllImages` to load everything again.

### building a dist
   `yarn build`

### rebuilding json from yaml and extra info:
   `yarn yaml2json`

### rebuilding all images:
   `yarn fetchAllImages`

### adding a custom image:
1. save it to the src/hosted_logos/, for example, src/hosted_logos/apex.png
2. update the landscape.yml with a logo, for exaple, `logo: ./src/hosted_logos/apex.png`
3. handle it as usually when you modify any reference to the image:
  - `npm run fetch`
