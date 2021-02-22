module.exports = app => {
    const User = require('../../models/User')
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')

    // express本身获取不到上传文件的数据，要借助中间件 multer
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' }  )
    app.post('/web/api/upload', upload.single('file'), async (req, res) => {
        const file = req.file  // 本身req没有file属性，使用中间件upload.single('file')才有
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    }) 

    // 注册接口
    app.post('/web/api/register', async (req, res) => {
        const {name,username, password, phone, sex, avatar} = req.body
        const user = await User.create({
            name: name,
            username: username,
            password: password,
            phone: phone,
            sex: sex,
            avatar: avatar,
        })
        res.send(user)

    })

    // 登录接口
    app.post('/web/api/login', async (req, res) => {
        // 1. 判断用户是否存在
        const user = await User.findOne({
            username: req.body.username
        })
        assert(user, 422, '用户不存在')
        // if(!user) {
        //     return res.status(422).send({
        //         message: '用户不存在'
        //     })
        // }
        // 2. 判断密码是否正确
        const isValid = require('bcrypt').compareSync(req.body.password, user.password)
        assert(isValid, 422, '密码错误')

        // 3. 生成token

        const token = jwt.sign({ id: String(user._id) }, app.get('secret'))
        res.send({
            user,
            token
        })
    })


    // 错误处理函数 捕获异常
    app.use( async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}