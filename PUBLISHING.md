To create and publish a release, perform the following steps:

### Checkout the master branch

    git checkout master

### Bump the version in package.json

We use [semantic versioning](https://semver.org). Set the correct `"version"` (2.11.0 in the following examples) in package.json.

Edit `CHANGELOG.md`: Add the version you are about to release just below the `## Next version` heading. Review the changes since the last release and document changes as appropriate.

Commit the change to master.

    git add package.json CHANGELOG.md
    git commit -m "Set version to 2.11.0"
    git push origin master

### Update README when API docs changed

To build the docs, run

    npm run doc

When the above results in changes to README.md, commit these changes to master:

    git add README.md
    git commit -m "Update API docs in README"
    git push origin master
    git checkout v2.11.0

### Create and checkout a release branch

    git branch v2.11.0
    git checkout v2.11.0

### Publish to npm

    npm publish

### Commit release artifacts

    git add -f dist
    git commit -m "Add dist for v2.11.0"

### Create and push a tag

    git tag -a v2.11.0 -m "2.11.0"
    git push --tags origin

### Edit the release notes

The previous step creates a release on GitHub. Copy the changelog for the relese from `CHANGELOG.md` to the "Describe this release" field for the release notes on https://github.com/openlayers/ol-mapbox-style/releases.
