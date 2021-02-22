const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./plugins/db')(app)

// 设置全局变量
app.set('secret', 'sdlsj');
// 实现跨域
app.use(require('cors')())

// req.body接收post参数，需加上下面这条命令
app.use(express.json())
app.use( bodyParser.urlencoded({
    extended:false
}) );
// 图片
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./routes/admin')(app)
require('./routes/web')(app)




app.listen(3000, () => {
    console.log('serve is running------http://localhost:3000')
})