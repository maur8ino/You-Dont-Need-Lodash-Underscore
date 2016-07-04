/**
 * @fileoverview Check methods you can use natively without lodash/underscore
 * @author Patrick McElhaney
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var kebabCase = require('kebab-case');
var rules = require('./rules');

Object.keys(rules).forEach(function(rule) {
  var errorMessage = rules[rule];
  module.exports[kebabCase(rule)] = {
    create: function(context) {
      return {
        CallExpression: function (node) {
          var callee = node.callee;
          var objectName = callee.object && callee.object.name || '';

          if ((objectName === '_' || objectName === 'lodash' || objectName === 'underscore') && callee.property && callee.property.name === rule) {
            context.report({
              node: node,
              message: errorMessage
            });
          }
        },
      };
    }
  };
});
