import mongodb from 'mongodb'
const MongodbClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017/edu'
export default (errlog, req, res, next) => {
    MongodbClient.connect(url, (err, db) => {
            db.collection('errors').insertOne({
                name: errlog.name,
                message: errlog.message,
                stack: errlog.stack,
                time: new Date()

            }, (err, result) => {
                if (err) {
                    throw err
                }
                res.json({
                    err_code: 500,
                    message: errlog.message
                })
            })
            db.close()
    })
}