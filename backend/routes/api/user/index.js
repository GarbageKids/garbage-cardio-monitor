const app = require('express').Router();
const db = require('../../../db/index');

const crypto = require('crypto');
const algorithm = 'aes-256-ctr';


app.post('/login', handleNoAuth, handleLogin);
app.post('/signup', handleNoAuth, handleSignUp);
app.get('/logout', handleAuth, handleLogout);

// 404
app.use(handle404);

function handle404(req, res, next) {
	res.status(404).json({ success: 0, text: 'API шалга'});
}

function handleNoAuth(req, res, next) {
	if(req.session.user) {
		res.json({ success: 0, text: 'Хандах боломжгүй'});
	} else {
		next();
	}
} 

function handleAuth(req, res, next) {
	if(!req.session.user) {
		res.json({ success: 0, text: 'Та нэвтрэх хэрэгтэй'});
	} else {
		next();
	}
}

function handleLogout(req, res) {
	req.session.destroy((err) => { res.json({ success: 1, text: 'Баяртай :)'}); });
}

function handleLogin(req, res) {
	let post = req.body;
	if(post.email && post.password) {
		post.password = encrypt(post.password);
		db.User.findOne(post, '_id', (err, row) => {
			if(err) res.json(err);			
			req.session.user = row;
			res.json({ success: row ? 1 : 0, text: 'Амжилттай нэвтэрлээ'});
		});
	} else {
		res.json({ success: 0, text: 'Алдаатай талбар'});
	}
}

function handleSignUp(req, res) {
	let post = req.body;
	if(post.password == post.cpassword) {
		post.password = encrypt(post.password);
		db.User(post).save((err) => {
			if(err) res.json({ success: 0 });
			res.json({ success: 1 });
		});
	} else {
		res.json({ success: 0, text: '2 нууц үг тэнцүү биш'});
	}
}

// Password 
function encrypt(password){
	let crypted = crypto.createHash('md5').update(password).digest("hex");
	return crypted;
}

module.exports = app;