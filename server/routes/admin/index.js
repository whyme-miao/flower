module.exports = app => {
    const express = require('express')
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    // 引入mongoose-sex-page
    const pagination =  require('mongoose-sex-page')
    const AdminUser = require('../../models/AdminUser')
    const User = require('../../models/User')

    const router = express.Router({
        mergeParams: true // 在api.use中定义的参数，要在router中使用，需要加mergeParams
    })


    // express本身获取不到上传文件的数据，要借助中间件 multer
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' }  )
    app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
        const file = req.file  // 本身req没有file属性，使用中间件upload.single('file')才有
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    }) 

    // 增
    router.post('/', async (req, res) => {
        
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    // 删
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true,
        })
    })

    // 改
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        assert(model, 422, '修改失败')
        res.send(model)
    })

    // 查
    router.get('/', async (req, res) => {
        const queryOptions1 = {}
        const queryOptions2 = {}
        const queryOptions3 = {}
        const queryOptions4 = {}
        if (req.Model.modelName === 'Category') {
            queryOptions1.populate = 'parent'
        }
        if (req.Model.modelName === 'Flower') {
            queryOptions2.populate = 'classify'
        }
        if (req.Model.modelName === 'Stock') {
            queryOptions3.populate = 'flowertitle'
        }
        if (req.Model.modelName === 'Stock') {
            queryOptions4.populate = 'classify'
        }

        const item = await req.Model.find().setOptions(queryOptions1)
        .setOptions(queryOptions2).setOptions(queryOptions3).setOptions(queryOptions4).limit(30)
        // console.log(item)
        res.send(item)
    })

    // 根据id查
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })




    // 登录校验中间件
    const authMiddleware = require('../../middleware/auth')
    // 获取对应的集合中间件
    const resourceMiddleware = require('../../middleware/resource')

    // CRUD
    // 这里请求'/admin/api/rest/:resource'之前
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

    // 登录接口
    app.post('/admin/api/login', async (req, res, next) => {
        const { username, password } = req.body
        // 1. 根据用户名找用户
        // 定义AdminUser模型的时候，设置了select为false，默认找不到，所以这里需用select('+password')强制查出
        const user = await AdminUser.findOne({username}).select('+password')  // 前缀- 被排除， 前缀+ 被选择
        assert(user, 422, '用户不存在')

        // 2. 校验密码
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, '密码错误')

        // 3. 返回token
        // 生成token jwt.sign(要保存的值，秘钥) app.get()只有一个参数，表示获取配置，否则为设置路由
        const token = jwt.sign({id: user._id}, app.get('secret'))
        res.send({token})
    })


    // 根据用户名称
    app.post('/admin/api/user', async (req, res) => {
        const user = await User.find({username: req.body.username})
        res.send(user)
    })


    // 实现分页
    app.post('/admin/api/page/users', async (req, res ) => {
        // const page = req.query.page || 1;
        const page = req.body.page || 1
        const size = req.body.size  || 5
        // page 指定当前页
        // size 指定每页显示的数据条数
        // display 指定客户端要显示的页面数量
        // exec 向数据库中发送查询请求
        const item = await pagination(User).find().page(page).size(size).display(3).exec();
        res.send(item)
    })

    // 错误处理函数 捕获异常
    app.use( async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })

}