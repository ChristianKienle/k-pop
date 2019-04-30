module.exports = {
  root: true,
  env: {
    node: true
  },
  overrides: [
    {
      files: ["**/__tests__/*.test.js"],
      env: {
        jest: true
      }
    }
  ],
  extends: ["plugin:vue/recommended"],
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  }
}
