
# filterable-landscape

Current [specification](https://docs.google.com/document/d/1QPVrXRjTWDQAwsbgSWutUmteXo0mTXcTvCNlz6qw0Uw/edit)

# Install on Mac
1. Install [Homebrew](https://brew.sh/)
2. `brew install node yarn`
3. `git clone git@github.com:cncf/filterable-landscape.git`

# Local development
1. `git pull`
2. `yarn` (installs dependencies)
3. `npm run yaml2json` (after fetching new commits or changing landscape.yml file)
* `yarn open:src` (starts a development server) or
* `yarn open:dist` (compiles and opens a production build)


# building a dist
   1. `yarn`
   2. `yarn build`
or with npm
   1. `npm run build`

# rebuilding json from yaml and extra info:
   `npm run yaml2json`

$ rebuilding images:
   `./node_modules/bin/babel-node tools/fetchImages.js`
