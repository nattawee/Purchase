'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Purchase Schema
 */
var PurchaseSchema = new Schema({
    docno: {
        type: String,
        default: '',
        unique: true,
        required: 'Please fill Purchase docno',
        trim: true
    },
    docdate: {
        type: Date,
        default: Date.now
    },
    client: {
        type: String,
        required: 'Please fill Purchase client'
    },
    company: {
        type: String
    },
    approv: {
        type: String
    },
    tender: {
        type: String
    },
    howtohire: {
        type: String
    },
    buyer: {
        type: String,
        required: 'Please fill Purchase buyer'
    },
    pursector: {
        type: String,
        required: 'Please fill Purchase pursector'
    },
    remark:[String],
    items: [{
        productcode: {
            type: String,
            required: 'Please fill Purchase productcode'
        },
        product: {
            type: String
        },
        qty: {
            type: Number
        },
        unitprice: {
            type: Number,
            default: 0
        },
        amount: {
            type: Number,
            default: 0
        },
        totalamount: {
            type: Number,
            default: 0
        }
    }],
    drilldate: {
        type: Date,
    },
    amount: {
        type: Number,
        default: 0
    },
    totalamount: {
        type: Number,
        default: 0
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

mongoose.model('Purchase', PurchaseSchema);
