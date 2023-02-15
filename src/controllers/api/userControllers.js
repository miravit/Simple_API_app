const { userRoles } = require('../../constants/users')
const User = require('../../models/User') //importera SCHEMA
const { NotFoundError, UnauthorizedError } = require('../../utils/errors') //importera felhanteringen

exports.deleteUserById = async (req, res) => {
	// Grab the user id and place in local variable
	const userId = req.params.userId //params låter en att hitta req.userId för det ser ut såhår projects/:userId

	// IF (den inloggade använder inte är det kontot den förösööker ta bort throw error.
	if (req.user.userId !== userId && req.user?.role !== userRoles.ADMIN) {
		throw new UnauthorizedError('Unauthorized Access')
	}

	// Get the user from the database
	const user = await User.findById(userId)

	// Not found error (ok since since route is authenticated)
	if (!user) throw new NotFoundError('That user does not exist')

	// Delete the user from the database
	await user.delete()

	// Send back user info
	return res.sendStatus(204)
}
