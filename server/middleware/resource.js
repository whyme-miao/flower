module.exports = option => {
    return async(req, res, next ) => {
        const modelName = require('inflection').classify(req.params.resource)
        // 这里需要把Model挂在到req中，不然后面的router请求接口时访问不到Model
        req.Model = require(`../models/${modelName}`)
        next()
    }
}