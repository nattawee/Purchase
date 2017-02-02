'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Safekeep Schema
 */
var SafekeepSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Safekeep name',
    trim: true
  },
  sequence:{
    type:Number,
    unique:true
  },
  resourceno: {
    type: String,
    required: 'Please fill Safekeep name'
  },
  certno: {
    type: String,
    required: 'Please fill Safekeep name'
  },
  local: {
    subdis: {
      type: String
    },
    dis: {
      type: String
    },
    provin: {
      type: String
    }
  },
  jobdes: String,
  howtohire: String,
  pursector: String,
  estimate: {
    amountest: {
      type: Number
    },
    dateest: {
      type: Date,
      default: Date.now
    },
    approvest: {
      type: String
    }
  },
  webbam: {
    datesub: {
      type: Date,
      default: Date.now
    },
    onweb: {
      type: Date,
      default: Date.now
    },
    refno: {
      type: String
    },
    url: {
      type: String
    }
  },
  adjust: {
    amountadj: {
      type: Number
    },
    dateadj: {
      type: String
    },
    approvadj: {
      type: String
    }
  },
  // ผู้เข้าร่วมเสนอราคาจำนวน
  participant: Number,
  //  ผู้รับเหมา
  contrac: String,
  // ผู้ดำนินการ
  operator: String,
  ncc: {
    nccdate: {
      type: Date,
      default: Date.now
    },
    nccno: {
      type: String
    }
  },
  remark: [String],
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Safekeep', SafekeepSchema);
