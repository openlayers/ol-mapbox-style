To create and publish a release, perform the following steps:

### Checkout the master branch

    git checkout master

### Bump the version in package.json

We use [semantic versioning](https://semver.org). Set the correct `"version"` (2.11.0 in the following examples) in package.json.

Commit the change to master.

    git add package.json
    git commit -m "Set version to 2.11.0"
    git push origin master

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
