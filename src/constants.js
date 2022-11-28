export const PATHS = {
	HOME: '/',
    ADD: '/add',
    WORKOUT: {
        NOVIEW: '/workout/',
		VIEW: path => `/workout/${path || ':path'}`,
	},
};