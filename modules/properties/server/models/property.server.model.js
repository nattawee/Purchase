'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Property Schema
 */
var PropertySchema = new Schema({
    propertyno: {
        type: Number,
        required: 'Please fill propertyno'
    },
    propertyid: {
        type: Number,
        required: 'Please fill propertyid'
    },
    documentno: {
        type: Number,
        required: 'Please fill documentno'
    },
    name: {
        type: String,
        default: '',
        required: 'Please fill Property name',
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
    propertydes: {
        type: String,
        required: 'Please fill propertydes'
    },
    processtype: {
        type: String,
        required: 'Please fill processtype'
    },
    methodtype: {
        type: String,
        required: 'Please fill methodtype'
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
            default: '',
            type: String,
            required: 'Please fill General approver',
            trim: true
        }
    },
    status: {
        type: String,
        default: 'draft',
        required: 'Please fill General owner',
        trim: true
    },
    announcement: {
        requestdate: Date,
        onlinedate: Date,
        reference: String
    }, purchase: {
        amount: {
            type: Number,
            default: 0,
            // required: 'Please fill General amount',
            trim: true
        },
        apprvdate: {
            type: Date,
            default: Date.now,
            // required: 'Please fill General apprvdate'
        },
        approver: {
            type: String,
            default: '',
            // required: 'Please fill General approver',
            trim: true
        }
    },
    supplier: String,
    refno: String,
    nacc: {
        naccdocdate: Date,
        naccdocno: String
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

mongoose.model('Property', PropertySchema);
