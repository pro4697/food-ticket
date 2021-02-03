const express = require('express');
const axios = require('axios');
const router = express.Router();
const { User } = require('../models/User');
const { Ticket } = require('../models/Ticket');
const { auth } = require('../middleware/auth');

router.get('/auth', auth, (req, res) => {
	res.status(200).json({
		_id: req.user._id,
		isAdmin: req.user.role === 0 ? false : true,
		isAuth: true,
		email: req.user.email,
		name: req.user.name,
		lastname: req.user.lastname,
		role: req.user.role,
		image: req.user.image,
		company: req.user.company,
	});
});

router.post('/register', async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		return res.status(200).json({
			success: true,
		});
	} catch (err) {
		console.log(err);
		return res.status(200).json({ success: false });
	}
});

router.post('/login', (req, res) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		if (!user)
			return res.json({
				loginSuccess: false,
				message: 'Auth failed, account not found',
			});

		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch) return res.json({ loginSuccess: false, message: 'Wrong password' });

			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err);
				res.status(200).json({
					loginSuccess: true,
					userId: user._id,
					tokenExp: user.tokenExp,
					token: user.token,
				});
			});
		});
	});
});

router.post('/github', async (req, res) => {
	if (!req.body.code) {
		return res.send({ success: false, messge: 'code error' });
	}

	const response = await axios.post(
		'https://github.com/login/oauth/access_token',
		{
			code: req.body.code,
			client_id: 'b1ca53d55037a1da7d82',
			client_secret: 'c2e6485de77917990e2c6c398caa47f9f0f94bef',
		},
		{
			headers: {
				accept: 'application/json',
			},
		}
	);

	const token = response.data.access_token;
	if (!token) {
		return res.send({ success: false, message: 'token error' });
	}
	const { data } = await axios.get('https://api.github.com/user', {
		headers: {
			Authorization: `token ${token}`,
		},
	});

	const result = {
		email: `g${data.login}@github.com`,
		password: `Github${data.id}`,
		name: data.name,
		image: `uploads/images/no-user.svg`,
	};

	User.findOne({ email: result.email }, async (err, user) => {
		if (!user) {
			const new_user = new User(result);
			try {
				await new_user.save();
			} catch (err) {
				return res.json({ success: false, message: 'DB error' });
			}
		}

		user.comparePassword(result.password, (err, isMatch) => {
			if (!isMatch) return res.json({ success: false, message: 'Wrong password' });

			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err);
				res.status(200).json({
					success: true,
					userId: user._id,
					tokenExp: user.tokenExp,
					token: user.token,
				});
			});
		});
	});
});

router.get('/logout', auth, async (req, res) => {
	try {
		await User.findOneAndUpdate({ _id: req.user._id }, { token: '', tokenExp: '' });
		return res.status(200).send({
			success: true,
		});
	} catch (error) {
		console.log(error);
	}
});

router.delete('/delete', (req, res) => {
	User.findOneAndDelete({ _id: req.query.userId }, (err, result) => {
		if (err) return res.status(400).json({ success: false, err });
		Ticket.deleteMany({ user: req.query.userId }, (err, result) => {
			if (err) return res.status(400).json({ success: false, err });
			return res.status(200).json({ success: true });
		});
	});
});

module.exports = router;
