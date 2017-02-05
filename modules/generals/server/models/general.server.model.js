'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * General Schema
 */
var GeneralSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill General name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('General', GeneralSchema);
