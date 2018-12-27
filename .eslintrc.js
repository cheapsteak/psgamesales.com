module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true
  },
  "parserOptions": {
    "allowImportExportEverywhere": true,
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "plugins": ["prettier", "babel"],
  "extends": ["prettier", "prettier/react"],
  "rules": {
    "prettier/prettier": [
      "warn",
      {
        "singleQuote": true,
        "trailingComma": "all"
      }
    ],
    "no-console": "warn"
  },
  "overrides": {
    "files": ["**/*.ts", "**/*.tsx"],
    "parser": "typescript-eslint-parser",
    "plugins": ["typescript"]
  }
}
