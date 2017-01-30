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
    // เกณฑ์มูลค่าสินทรัพย์ที่มีตัวตนสุทธิ
    obtaining: String,
    ptyvalue: String,
    ptvcomapany: String
  },
  forecast: {
    //  เกณฑ์กำไรสุทธ
    entryacq: String,
    net: String,
    totalnet: String,
  },
  ttvconsider: {
    // เกณฑ์มูลค่ารวมของสิ่งตอบแทน
    valueofaset: String,
    issuedost: String
  },
  valuesecur: {
    // เกณฑ์มูลค่าของหลักทรัพย
    payment: String,
    companypaid: String
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

mongoose.model('Acquisition', AcquisitionSchema);
