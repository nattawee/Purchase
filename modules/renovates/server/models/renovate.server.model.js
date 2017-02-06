'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Renovate Schema
 */
var RenovateSchema = new Schema({
  renovateno: {
    type: Number,
    required: 'Please fill renovateno'
  },
  renovateid: {
    type: Number,
    required: 'Please fill renovateid'
  },
  documentno: {
    type: Number,
    required: 'Please fill documentno'
  },
  name: {
    type: String,
    default: '',
    required: 'Please fill Renovate name',
    trim: true
  },
  location: {
    subdistrict: {
      type: String,
      required: 'Please fill location subdistrict'
    },
    district: {
      type: String,
      required: 'Please fill location district'
    },
    province: {
      type: String,
      required: 'Please fill location province'
    }
  },
  renovatedes: {
    type: String,
    required: 'Please fill renovatedes'
  },
  processtype: {
    type: String,
    required: 'Please fill processtype'
  },
  methodtype: {
    type: String,
    required: 'Please fill methodtype'
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

mongoose.model('Renovate', RenovateSchema);
