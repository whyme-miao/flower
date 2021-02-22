module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://flowers:flowers@localhost:27017/flowers', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology:true,
        
    })
    // 监听是否连接成功
    mongoose.connection.on("connected", function() {
        console.log("连接数据库成功");
    })

}