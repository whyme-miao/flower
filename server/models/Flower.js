const mongoose = require('mongoose')

const schema = new mongoose.Schema({

    flowerTitle: { 
        type: String,
        required: [true, '标题不能为空'],
        trim: true
    },
    description: {
        type: String,
        default: '暂无简介'
    },
    picture: { type: String},
    // 库存数量
    // num: { 
    //     type: Number,
    //     required: [true, '请输入数量'],
    //     trim: true
    // },
    price: { 
        type: Number,
        default: 0,
    },
    // 已售
    sold: { 
        type: Number,
        default: 0
    },
    classify: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
    // 上架时间
    addtime: { type: Date}
})

module.exports = mongoose.model('Flower', schema)