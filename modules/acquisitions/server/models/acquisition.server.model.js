'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Acquisition Schema
 */
var AcquisitionSchema = new Schema({
  buyer: String,
  seller: String,
  nta: {
    // เกณฑ์มูลค่าสินทรัพย์สุทธิ
    obtaining: String,
    ptyvalue: String,
    ptvcomapany: String,
    ntatotal: String
  },
  forecast: {
    //  เกณฑ์กำไรสุทธ
    entryacq: String,
    net: String,
    totalnet: String,
    fortotal: String
  },
  ttvconsider: {
    // เกณฑ์มูลค่ารวมของสิ่งตอบแทน
    valueofaset: String,
    issuedost: String,
    ttvctotal: String
  },
  valuesecur: {
    // เกณฑ์มูลค่าของหลักทรัพย
    payment: String,
    companypaid: String,
    valuesecur: String
  },
  maximum:String,
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Acquisition', AcquisitionSchema);
