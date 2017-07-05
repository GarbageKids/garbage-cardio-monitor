const app = require('express').Router();
const db = require('../../../db/index');

const crypto = require('crypto');
const algorithm = 'aes-256-ctr';

app.post('/login', handleLogin);
app.post('/signup', handleSignUp);

function handleLogout(req, res) {
	req.session.user = null;
}

function handleLogin(req, res) {
	let post = req.body;
	if(post.email && post.password) {
		post.password = encrypt(post.password);
		db.User.findOne(post, '_id', (err, row) => {
			if(err) res.json(err);			
			req.session.user = row;
			res.json({ success: row ? 1 : 0});
		});
	} else {
		res.json({ error: 1 });
	}
}

function handleSignUp(req, res) {
	let post = req.body;
	if(post.password == post.cpassword) {
		post.password = encrypt(post.password);
		db.User(post).save((err) => {
			if(err) res.json({ error: 1 });
			res.json({ success: 1 });
		});
	} else {
		res.json({ error: 1});
	}
}

// Password 
function encrypt(password){
	let crypted = crypto.createHash('md5').update(password).digest("hex");
	return crypted;
}

module.exports = app;