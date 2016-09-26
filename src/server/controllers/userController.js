// == AUTHORIZATION ==============================================
exports.login = (req, res) => {
	console.log('in login');
	res.send('login');
};

exports.signup = (req, res) => {
	res.send('signup');
};

exports.logout = (req, res) => {
	res.send('logout');
};