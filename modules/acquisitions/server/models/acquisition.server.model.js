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
        obtaining: Number,
        ptyvalue: Number,
        ptvcomapany: Number,
        ntatotal: Number
    },
    forecast: {
        //  เกณฑ์กำไรสุทธ
        entryacq: Number,
        net: Number,
        totalnet: Number,
        fortotal: Number
    },
    ttvconsider: {
        // เกณฑ์มูลค่ารวมของสิ่งตอบแทน
        valueofaset: Number,
        issuedost: Number,
        ttvctotal: Number
    },
    valuesecur: {
        // เกณฑ์มูลค่าของหลักทรัพย
        payment: Number,
        companypaid: Number,
        valuesecur: Number
    },
    maximum: {
        type: Number,
        required: 'Please fill Acquisition maximum'
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
