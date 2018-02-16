
# Cloud Native Filterable Landscape

[![CNCF Landscape Logo](https://raw.githubusercontent.com/cncf/artwork/master/other/cncf-landscape/horizontal/color/cncf-landscape-horizontal-color.png)](https://github.com/cncf/artwork/blob/master/other/cncf-landscape/horizontal/color/cncf-landscape-horizontal-color.png)

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

## Todo items

* [Kanban](https://github.com/cncf/filterable-landscape/projects/1) of current tasks

## Static Landscape

[![CNCF Landscape](https://raw.githubusercontent.com/cncf/landscape/master/landscape/CloudNativeLandscape_latest.png)](https://raw.githubusercontent.com/cncf/landscape/master/landscape/CloudNativeLandscape_latest.png)

## License

This repository contains data received from [Crunchbase](http://www.crunchbase.com). This data is not licensed pursuant to the Apache License, Version 2.0. It is subject to Crunchbase’s Data Access Terms, available at [https://data.crunchbase.com/v3.1/docs/terms](https://data.crunchbase.com/v3.1/docs/terms), and is only permitted to be used with this CNCF Cloud Native Landscape Project.

Everything else is under the Apache License, Version 2.0, except for project and product logos, which are generally copyrighted by the company that created them, and are simply cached here for reliability.

## Logos

The following rules will produce the most readable and attractive logos:

1. We strongly prefer SVG, as they are smaller, display correctly at any scale, and work on all modern browsers. If you only have the logo in another vector format (like AI, EPS, or PSD), please open as issue and we'll convert it to SVG for you.
1. If it must be a PNG, the dimensions of the source logo should be at least 540x360, as that is what they are resized to. A transparent background is better; white will be converted to a transparent background.
1. When multiple variants exist, use stacked (not horizontal) logos. For example, we use the second column (stacked), not the first (horizontal), of CNCF project [logos](https://github.com/cncf/artwork/#cncf-incubating-logos).
1. Don't use reversed logos (i.e., with a non-white, non-transparent background color). If you only have a reversed logo, create an issue with it attached and we'll produce a non-reversed version for you.
1. Logos must include the company, product or project name in English. It's fine to also include words from another language. If you don't have a version of your logo with the name in it, please open an issue and we'll create one for you (and please specify the font).
1. If the name of the product is not in the logo, then the company name should be included in the product name. So an Acme Rocket logo that shows "Rocket" should have product name "Rocket", while if the logo shows "Acme Rocket", the product name should be "Acme Rocket". Otherwise, logos looks out of place when you sort alphabetically.
1. Google images is often the best way to find a good version of the logo (but ensure it's the up-to-date version). Search for [project-name logo filetype:svg]. You can then change SVG files to PNG if you can't find a suitable SVG. When looking for PNGs click Tools, More Tools, and then Show Sizes or click this [image search link](https://www.google.com/search?q=kubernetes&tbs=ift:svg,imgo:1&tbm=isch) and change the search query.

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

After making changes to `landscape.yml`, run `yarn fetch` to fetch any needed data and generate [processed_landscape.yml](processed_landscape.yml) and [file](https://github.com/cncf/filterable-landscape/blob/master/src/data.json).

`yarn fetch` runs in 4 modes of increasingly aggressive downloading, with a default to easy. Reading data from the cache (meaning from processed_landscape.yml) means that no new data is fetched if the project/product already exists. The modes are:

| Data cached            | easy   | medium   | hard   | complete   |
|------------------------|--------|----------|--------|------------|
| **Crunchbase**         | true   | false    | false  | false      |
| **GitHub basic stats** | true   | false    | false  | false      |
| **GitHub start dates** | true   | true     | false  | false      |
| **Image data**         | true   | true     | true   | false      |

* **Easy** mode just fetches any data needed for new projects/products.
* **Medium** fetches Crunchbase and basic GitHub data for all projects/products.
* **Hard** also fetches GitHub start dates. These should not change so this should not be necessary.
* **Complete** also re-fetches all images. This is problematic because images tend to become unavailable (404) over time, even though the local cache is fine.

Easy mode (the default) is what you should use if you update `landscape.yml` and want to see the results locally. The Netlify build server runs easy mode, which makes it possible to just commit a change to landscape.yml and have the results reflected in production. Run with `yarn fetch`.

Medium mode is what is run by the update server, with commits back to the repo. It needs to be run regularly to update last commit date, stars, and Crunchbase info. Run with `yarn update`.

Hard and complete modes should be unnecessary except in cases of possible data corruption. Even then, it's better to just delete any problematic entries from `processed_landscape.yml` and easy mode will recreate them with up-to-date information.

### Adding a custom image
1. Save it to the src/hosted_logos/, for example, src/hosted_logos/apex.png
2. Update the landscape.yml with a logo, for example, `logo: ./src/hosted_logos/apex.png`. Please always start it from  the `./src/hosted_logos`
3. Update `processed_landscape.yml` with `yarn fetch`
