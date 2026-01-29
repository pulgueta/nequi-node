/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  "branches": [
    "main",
    "next"
  ],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/changelog",
      {
        "changelogFile": "./packages/server/CHANGELOG.md"
      }
    ],
    [
      "@semantic-release/git",
      {
        "assets": [
          "./packages/server/CHANGELOG.md"
        ]
      }
    ],
    "@semantic-release/github"

  ]
}