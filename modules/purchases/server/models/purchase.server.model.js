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
        // เลขที่ใบสั่งซื้อ
        type: String,
        default: '',
        unique: true,
        // required: 'Please fill Purchase docno',
        trim: true
    },
    docdate: {
        // วันที่
        type: Date,
        default: Date.now
    },
    client: {
        // ฝ่าย/สำนักงาน
        type: String,
        required: 'Please fill Purchase client'
    },
    company: {
        // ผู้รับผิดชอบ
        type: String
    },
    approvmd: {
        // Medium price
        amdamount: {
            type: Number
        },
        appmdate: {
            type: Date,
            default: Date.now
        },
        appmd: {
            type: String
        }
    },
    approvph: {
        // purchase
        appphamount: {
            type: Number
        },
        apppdate: {
            type: Date,
            default: Date.now
        },
        appph: {
            type: String
        }
    },
    tender: {
        // เลขที่ใบขอซื้อ
        type: String
    },
    howtohire: {
        //วิธีซื้อ/จ้าง
        type: String
    },
    buyer: {
        // ผู้ซื้อ
        type: String
        // required: 'Please fill Purchase buyer'
    },
    pursector: {
        // ประเภทการจัดซื้อ / จัดจ้าง
        type: String,
        required: 'Please fill Purchase pursector'
    },
    remark: [String],
    webbam: {
        // ประกาศลงเว็บ        
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
    success: {
        // ผู้ชนะการเสนอราคา
        type: String
    },
    po: {
        // เลขที่สัญญา/PO
        type: String
    },
    ncc: {
        // คุมสัญญาจากสำนักงาน ป.ป.ช.	
        nccdate: {
            type: Date,
            default: Date.now
        },
        nccno: {
            type: String
        },
    },
    items: [{
        // รายชื่อสินค้า
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
        // กำหนดส่งมอบ วันที่
        type: Date,
        default: Date.now
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
