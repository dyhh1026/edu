import express from 'express'
import config from './config'
import nunjucks from 'nunjucks'
import advertRouter from './routes/advert'
import indexRouter from './routes/index'
import bodyparse from './middlewares/bodyparse'
import errlog from './middlewares/error-log'
const app = express()
app.use('/node_modules',express.static(config.modulePath))
app.use('/public',express.static(config.public))
nunjucks.configure(config.viewPath,{
    autoescape: true,
    express: app,
    noCache: true
})
app.use(bodyparse)
app.use(indexRouter)
app.use(advertRouter)
app.use(errlog)
app.listen(3000,()=>{
    console.log('server is running')
})
