"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"testing"',
  URL_API_BASE: '"http://localhost:3001/api/v1"'
});
