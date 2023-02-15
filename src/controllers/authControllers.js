const { BadRequestError, UnauthenticatedError } = require('../utils/errors') //UnauthenticatedError
const bcrypt = require('bcrypt') //ett bibiliotke som hjälper att hash salt lösen (algoritm)
const User = require('../models/User') //importera user model SCHEMAT.
const { userRoles } = require('../constants/users') //rollerna enum
const jwt = require('jsonwebtoken') //JWT TOKENS

exports.register = async (req, res) => {
	// Placera inskickad data (epost, lösenord, username) i lokala variabler
	const { email, password, username } = req.body //hämtar alltså mail, lösen username.

	// Validera att datan vi behöver skickades in
	if (!username || !email || !password) {
		throw new BadRequestError('You must provide an email, password and username to register')
	}

	// Kryptera lösenordet med bcrypt
	//salt är när man lägger massa tecken innan och efter så användare inte får samma lösen
	const salt = await bcrypt.genSalt(10) //10 är högt nog för att motverka potentiell attack men lågt nog att inte slow down. läggs i variabeln salt.
	const hashedPassword = await bcrypt.hash(password, salt) //hasha löösöen genom att ta lösen + salt variabeln. nu är det dubbelt säkert

	const newUser = {
		//den nya användaren med hashed password.
		username,
		email,
		password: hashedPassword,
	}

	// ADMIN logic: If (firstUser in db) makeAdmin
	const usersInDb = await User.countDocuments() //returnerar de dokument som requestas. alltså alla users.
	if (usersInDb === 0) newUser.role = userRoles.ADMIN //om det är den första användaren som skapas - gör till admin.

	// Add new user to MONGODB
	await User.create(newUser)

	// Send response
	return res.status(201).json({
		message: 'Registration successful. Please log in.',
	})
}

exports.login = async (req, res) => {
	// Placera inskickad data (epost, lösenord) i lokala variabler
	const { email, password: candidatePassword } = req.body //password: candidatePassword varför??

	// Validera att datan vi behöver skickades in
	if (!email || !candidatePassword) {
		throw new BadRequestError('You must provide an email and a password')
	}

	// Kolla om användarens epost finns
	const user = await User.findOne({ email: email }) //här deklareras user som används i JWT token. inte samma user som User. Den är importerad från vårat SCHEMA
	if (!user) {
		throw new UnauthenticatedError('Invalid credentials')
	}

	// Kolla om lösenordet är korrekt
	const isPasswordCorrect = await bcrypt.compare(candidatePassword, user.password)
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError('Invalid credentials')
	}

	// Skapa våran JWT token (header, payload och signature) detta är den decodade
	const jwtPayload = {
		userId: user._id, //id
		role: user.role, //admin eller inte
		username: user.username, //username
	}

	const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
		//här encodas token till hemliga stringen
		//när min token går ut
		expiresIn: /* '1d' */ '2h',
	})

	// Response i postman?
	return res.json({
		token: token, //ger tilbaka vår krypterade token användare kan använda för att logga in
		user: jwtPayload, //våran payload men infon.
	})
}
