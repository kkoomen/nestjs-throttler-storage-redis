# Contributions

Any and all contributions are welcome as long as they meet the contribution
requirements.

## How to Contribute

1. Create a fork of the repository
2. Clone the code to your local machine
3. Create a new branch with the feature you are working on or with the issue number (e.g. issue/42)
4. Run `yarn`
5. Implement your changes, ensure tests are still passing, or add tests if it is a new feature
6. Push back to your version on GitHub
7. Raise a Pull Request to the main repository

## Development

All the source code is in `src` as expected. Most of the code should be rather
self documented.

## Testing

To run a basic dev server you can use `start:dev` to run `nodemon` and
`ts-node`. All tests should be running through `jest` using `test:e2e`
otherwise.

If you need to run tests for a specific context, use `yarn test:e2e <type>` e.g.
`yarn test:e2e controller` will run the e2e tests for the HTTP guard.

## Commits

We are using [Conventional Commit](commitlint) to help keep
commit messages aligned as development continues. The easiest way to get
acquainted with what the commit should look like is to run `yarn commit` which
will use the `git-cz` cli and walk you through the steps of committing. Once
you've made your commit, prettier and eslint will run and ensure that the new
code is up to the standards we have in place.

## Issues

Please raise an issue, or discuss with me at [Discord](https://discordapp.com) (kkoomen#3343) before opening a Pull Request so we can see if they align with the goals of the project.

[commitlint]: https://github.com/conventional-changelog/commitlint
