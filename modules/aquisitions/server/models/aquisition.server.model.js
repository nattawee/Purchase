'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Aquisition Schema
 */
var AquisitionSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Aquisition name',
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

mongoose.model('Aquisition', AquisitionSchema);
