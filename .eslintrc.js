module.exports = {
  "parser": "typescript-eslint-parser",
  "env": {
    "browser": true,
    "es6": true
  },
  "parserOptions": {
    "allowImportExportEverywhere": true,
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "plugins": ["prettier", "babel", "typescript"],
  "extends": ["prettier", "prettier/react", 'plugin:react/recommended'],
  "rules": {
    "prettier/prettier": [
      "warn",
      {
        "singleQuote": true,
        "trailingComma": "all",
        "parser": "typescript"
      }
    ],
    "no-console": "warn",
    "no-unused-vars": "warn",
    "typescript/no-unused-vars": "warn"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "overrides": {
    "files": ["**/*.ts", "**/*.tsx"],
    "parser": "typescript-eslint-parser",
    "plugins": ["typescript"]
  }
}
