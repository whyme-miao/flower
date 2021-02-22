const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ordernum: { type: String }, // 订单流水号
})