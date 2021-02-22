const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    flowertitle: { 
        type: mongoose.SchemaTypes.ObjectId, ref: 'Flower'
    },
    // flowerTitle: { 
    //     type: String,
    //     required: [true, '标题不能为空'],
    //     trim: true
    // },
    picture: { type: String},
    classify: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
    total: {
        type: Number,
        required: [true, '数量不能为空']
    }

})

module.exports = mongoose.model('Stock', schema)