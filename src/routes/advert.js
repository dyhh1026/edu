import express from 'express'
import Advert from '../models/Advert'
import formidable from 'formidable'
import config from '../config'
import path from 'path'
const router = express.Router()
router.get('/advert',(req,res,next)=>{
   const page = Number.parseInt(req.query.page,10)
   const pageSize = 5
    Advert
        .find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec((err, Adverts) => {
            if (err) {
                next(err)
            }
            Advert.count((err, count) => {
                if (err) {
                   return next(err)
                }
                const pageCount = Math.ceil(count / pageSize)
                res.render('advert_list.html', { Adverts, pageCount,page })
            })
        })

})
router.get('/advert/add',(req,res,next)=>{
    res.render('advert_add.html')
})
router.post('/advert/add', (req, res, next) => {
    const form = formidable({uploadDir: config.uploadDirPath,keepExtensions: true});
    form.parse(req,(err,fields,files) => {
        if(err){
            return next(err)
        }
        const body = fields
        body.image = path.basename(files.image.path)
           
        const advert = new Advert({
        title: body.title,
        image: body.image,
        link: body.link,
        start_time: body.start_time,
        end_time: body.end_time
       })
       advert.save((err,result) =>{
           if(err){
               return next(err)  
           }
           res.json({
               err_code: 0,
               dd: 123
           })
       })
     }) 
 
})
router.get('/advert/list',(req,res,next)=>{
    Advert.find((err,docs)=>{
        if(err){
            return next(err)
        }
        res.json({
            err_code: 0,
            result: docs
        })
    })

})
router.get('/advert/one/:advertId',(req,res,next)=>{
    
    Advert.find({_id:req.params.advertId},(err,result)=>{
        if(err){
            return next(err)
        }
        res.json({
            err_code: 0,
            result: result
        })
    })
    
})
router.post('/advert/edit',(req,res,next) => {
    Advert.findById(req.body.id,(err,advert)=>{
    const body = req.body
    advert.title = body.title
    advert.image = body.image
    advert.link = body.link
    advert.start_time = body.start_time
    advert.end_time = body.end_time
    advert.last_modified = Date.now()
    advert.save((err,result)=>{
        if(err){
            return next(err)
        }
        res.json({
            err_code: 0,
            result: result
        })
    
      })
    })
})
router.get('/advert/remove/:advertId',(req,res,next)=>{
    Advert.remove({_id:req.params.advertId},(err,result)=>{
        if(err) {return next(err)}
        res.json({
            err_code: 0
        })
    
    })
})
export default router
