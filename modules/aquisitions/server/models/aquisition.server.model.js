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
  from1: {
    nta: {
      assetssum: {
        type: Number,
        required: 'Please fill Aquisition assetssum',
      },
      assetsintangible: {
        type: Number,
        required: 'Please fill Aquisition assetsintangible',
      },
      debtssum: {
        type: Number,
        required: 'Please fill Aquisition debtssum',
      },
      shareholder: Number,
      ntasum: {
        type: Number,
        required: 'Please fill Aquisition ntasum',
      }
    },
    acqodis: {
      type: Number,
      required: 'Please fill Aquisition acqodis',
    },
    ntalisted: {
      type: Number,
      required: 'Please fill Aquisition ntalisted',
    }
  },
  from2: {
    netoperating: {
      type: Number,
      required: 'Please fill Aquisition netoperating',
    },
    ratio: {
      type: Number,
      required: 'Please fill Aquisition ratio',
    },
    netcompany: {
      type: Number,
      required: 'Please fill Aquisition netcompany',
    }
  },
  from3: {
    amount: {
      type: Number,
      required: 'Please fill Aquisition amount',
    },
    assetscompany: {
      type: Number,
      required: 'Please fill Aquisition assetscompany',
    }
  },
  from4: {
    sharespay: {
      type: Number,
      required: 'Please fill Aquisition sharespay',
    },
    sharespaycompany: {
      type: Number,
      required: 'Please fill Aquisition sharespaycompany',
    }
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
