# filterable-landscape

Current [specification](https://docs.google.com/document/d/1QPVrXRjTWDQAwsbgSWutUmteXo0mTXcTvCNlz6qw0Uw/edit)

# local-development
1) install node 8.9 (once)
2) install yarn (once)
3) yarn (after fetching new commits)
4) npm run yaml2json (after fetching new commits or changing src/data.yml file)
5) yarn open:src (starts a development server)
     or
   yarn open:dist (compiles and opens a production build)


# building a dist
   1) yarn
   2) yarn build
or with npm
   1) npm run build

# rebuilding json from yaml and extra info:
   npm run yaml2json
