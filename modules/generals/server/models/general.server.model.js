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
  trnsdate: {
    type: Date,
    default: Date.now,
    required: 'Please fill General trnsdate'
  },
  itemdesc: {
    type: String,
    default: '',
    required: 'Please fill General itemdesc',
    trim: true
  },
  department: {
    type: String,
    default: '',
    required: 'Please fill General department',
    trim: true
  },
  owner: {
    type: String,
    default: '',
    required: 'Please fill General owner',
    trim: true
  },
  docno: {
    type: String,
    default: '',
    required: 'Please fill General docno',
    trim: true
  },
  estexpense: {
    amount: {
      type: Number,
      default: 0,
      required: 'Please fill General amount',
      trim: true
    },
    apprvdate: {
      type: Date,
      default: Date.now,
      required: 'Please fill General apprvdate'
    },
    approver: {
      type: String,
      default: '',
      required: 'Please fill General approver',
      trim: true
    }
  },
  processtype: {
    type: String,
    default: 'draft',
    required: 'Please fill General processtype',
    trim: true
  },
  methodtype: {
    type: String,
    default: 'draft',
    required: 'Please fill General methodtype',
    trim: true
  },
  announcement : {
    requestdate : Date,
    onlinedate : Date,
    reference : String
  },
  purchase: {
    amount: {
      type: Number,
      default: 0,
      required: 'Please fill General amount',
      trim: true
    },
    apprvdate: {
      type: Date,
      default: Date.now,
      required: 'Please fill General apprvdate'
    },
    approver: {
      type: String,
      default: '',
      required: 'Please fill General approver',
      trim: true
    }
  },
  supplier: String,
  refno : String,
  nacc : {
    naccdocdate : Date,
    naccdocno : String
  },
  status: {
    type: String,
    default: 'draft',
    required: 'Please fill General owner',
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
