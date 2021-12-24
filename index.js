var __DEV__ = false; // Dev testing, when errors exist
if(__DEV__) {
	process.env.DEBUG = '*'
	process.env.NODE_ENV = 'development'
} else {
	process.env.NODE_ENV = 'production'
}
const express = require('express');
const INFO = require('./data.js')
const app = express();
const ejs = require('ejs');
const [path,fs] = [require('path'),require('fs')]
const handleError = (err) => {
console.log('='.repeat(30))
console.log(`Express, error`,err.message)
console.error(err)
console.log('='.repeat(30))
}
const renderEjs = (filename, prams) => {
const FilePath = path.join(__dirname, 'views', filename)
return ejs.render(fs.readFileSync(FilePath).toString(), prams)
}
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.get('/', (req, res) => {
res.render('index', { req, res, INFO, renderEjs })
});
app.use('*', (req,res) => {
res.render('404', { INFO, req,res })
})
app.use('*', (err,req,res,next) => {
res.render('500', { req,res, err,
INFO,
clean: require('util').inspect
 })
next(err)
}, handleError)
app.listen(3000, () => {
  console.log('server started');
});
process.on('unhandledRejection' , (err) => {

process.report.writeReport('errors.json', new Error(err))
console.error(err.message)
})

'';