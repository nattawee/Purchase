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
    // propertyno: {
    //     type: Number,
    //     required: 'Please fill propertyno'
    // },
    propertyid: {
        type: String,
        default: 'ยังไม่ระบุ',
        //required: 'Please fill propertyid'
    },
    documentno: {
        type: String,
        default: 'ยังไม่ระบุ',
        //required: 'Please fill documentno'
    },
    name: {
        type: String,
        default: 'ยังไม่ระบุ',
        //required: 'Please fill Property name',
        trim: true
    },
    location: {
        subdistrict: {
            type: String,
            //required: 'Please fill location subdistrict'
        },
        district: {
            type: String,
            //required: 'Please fill location district'
        },
        province: {
            type: String,
            //required: 'Please fill location province'
        }
    },
    propertydes: {
        type: String,
        //required: 'Please fill propertydes'
    },
    department: {
        type: Schema.ObjectId,
        ref: 'Branch'
    },
    processtype: {
        type: String,
        //required: 'Please fill processtype'
    },
    methodtype: {
        type: String,
        //required: 'Please fill methodtype'
    },
    estexpense: {
        amount: {
            type: Number,
            default: 0,
            //required: 'Please fill General amount',
            trim: true
        },
        apprvdate: {
            type: Date,
            //default: Date.now,
            //required: 'Please fill General apprvdate'
        },
        approver: {
            default: '',
            type: String,
            //required: 'Please fill General approver',
            trim: true
        }
    },
    form1: {
        field1: {
            field11: String,
            field12: String
        },
        field2: Number,
        field3: String,
        field4: {
            field41: Date,
            field42: Number
        },
        field5: {
            field50: String,
            field51: String,
            field52: String,
            field53: String,
            field54: String
        },
        field6: String
    },
    form2: {
        field1: {
            field11: String,
            field12: String
        },
        field2: Number,
        field3: {
            field31: Date,
            field32: Number
        },
        field4: {
            field41: Number,
            field42: String,
            field43: String,
            field44: String
        },
        field5: Number,
        field6: Number,
        field7: String,
        field8: String
    },
    form3: {
        field1: {
            field11: String,
            field12: String
        },
        field2: Number,
        field3: {
            field31: Date,
            field32: Number
        },
        field4: {
            field41: Number,
            field42: String,
            field43: String,
            field44: String
        },
        field5: Number,
        field6: Number,
        field7: Number,
        field8: String
    },
    form4: {
        field1: {
            field11: String,
            field12: String
        },
        field2: Number,
        field3: {
            field31: Date,
            field32: Number
        },
        field4: {
            field41: Number,
            field42: String,
            field43: String,
            field44: String
        },
        field5: Number,
        field6: Number,
        field7: Number,
        field8: String,
        field9: String
    },
    form5: {
        field1: {
            field11: String,
            field12: String
        },
        field2: Number,
        field3: {
            field31: Date,
            field32: Number
        },
        field4: {
            field41: Number,
            field42: String,
            field43: String,
            field44: Number
        },
        field5: Number,
        field6: Number,
        field7: Number,
        field8: Number,
        field9: {
            field91: Number,
            field92: Number
        },
        field10: Number,
        field11: String,
        field12: Number
    },
    form6: {
        field1: {
            field11: String,
            field12: String
        },
        field2: Number,
        field3: {
            field31: Date,
            field32: Number
        },
        field4: Number,
        field5: Number,
        field6: Number,
        field7: Number,
        field8: String,
        field9: String
    },
    form7: {
        field1: {
            field11: String,
            field12: String
        },
        field2: Number,
        field3: {
            field31: Date,
            field32: Number,
            field33: Number
        },
        field4: {
            field41: String,
            field42: String,
            field43: String
        },
        field5: Number
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
            //default: Date.now,
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
    approved: {
        type: Date,
        default: Date.now
    },
    approver: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    updated: {
        type: Date,
        default: Date.now
    },
    updater: {
        type: Schema.ObjectId,
        ref: 'User'
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
