import * as ActionTypes from './ActionTypes'
import axios from 'axios'


export const authStart = () => {
	return {
		type: ActionTypes.AUTH_START
	}
}

export const authSuccess = token => {
	return {
		type: ActionTypes.AUTH_SUCCESS,
		token: token
	}
}

export const authFail = error => {
	return {
		type: ActionTypes.AUTH_FAIL,
		error: error
	}
}

export const logout = () => {
	localStorage.removeItem('user')
	localStorage.removeItem('expirationDate')
	return {
		type: ActionTypes.AUTH_LOGOUT
	}
}

export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout())
		}, expirationTime * 1000)
	}
}

export const authLogin = (username, password) => {
	return dispatch => {
		dispatch(authStart())
		axios.post('/login', {
			username: username,
			password: password
		})
			.then(res => {
				const token = res.data.key
				const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
				localStorage.setItem('token', token)
				localStorage.setItem('expirationDate', expirationDate)
				dispatch(authSuccess(token))
				dispatch(checkAuthTimeout(3600))
			})
			.catch(err => {
				dispatch(authFail(err))
			})
	}
}

export const authSignup = (username, phone, city, password1, password2) => {
	return dispatch => {
		dispatch(authStart())
		axios.post('/registration', {
			username: username,
			phone: phone,
			city: city,
			password: password1,
			password: password2
		})
			.then(res => {
				const token = res.data.key
				const expirationDate = new Date(new Date().getTime() + 3600 * 1000)
				localStorage.setItem('token', token)
				localStorage.setItem('expirationDate', expirationDate)
				dispatch(authSuccess(token))
				dispatch(checkAuthTimeout(3600))
			})
			.catch(err => {
				dispatch(authFail(err))
			})
	}
}

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token')
		if (token === undefined) {
			dispatch(logout())
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'))
			if (expirationDate <= new Date()) {
				dispatch(logout())
			} else {
				dispatch(authSuccess(token))
				dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000 ))
			}
		}
	}
}