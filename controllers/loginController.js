const userDB = {
    users: require('../model/users.json'),
};
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = userDB.users.find(person => person.username === user);
    if (!foundUser) return res.status(401).json({ 'message': 'Incorrect username or password.' });

    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        req.session.user = { username: foundUser.username, roles: foundUser.roles };
        res.json({ 'success': `User ${user} is logged in!` });
    } else {
        res.status(401).json({ 'message': 'Incorrect username or password.' });
    }
};

module.exports = { handleLogin };