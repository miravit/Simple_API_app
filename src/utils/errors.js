const catchErrors = (fn) => {
	return function (req, res, next) {
		return fn(req, res, next).catch(next)
	}
}

//här kan jag skapa en trycatch error-grej. finns i anteckningar lektion 8 hur man gör. för att undvika try-catch-block

class CustomAPIError extends Error {
	// DETTA FUNKAR INTE FÖR MIIIIIG
	constructor(message) {
		super(message)
	}
}

class NotFoundError extends CustomAPIError {
	constructor(message) {
		super(message)
		this.statusCode = 404
		this.name = 'NotFound'
	}
}
class BadRequestError extends CustomAPIError {
	constructor(message) {
		super(message)
		this.statusCode = 404
		this.name = 'BadRequest'
	}
}
class UnauthenticatedError extends CustomAPIError {
	constructor(message) {
		super(message)
		this.statusCode = 401
		this.name = 'UnauthenticatedError'
	}
}
class UnauthorizedError extends CustomAPIError {
	constructor(message) {
		super(message)
		this.statusCode = 403
		this.name = 'UnauthorizedError'
	}
}

module.exports = { catchErrors, CustomAPIError, NotFoundError, BadRequestError, UnauthenticatedError, UnauthorizedError }
