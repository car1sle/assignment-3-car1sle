export const PATHS = {
	HOME: '/assignment-3-car1sle/',
    ADD: '/assignment-3-car1sle/add',
    WORKOUT: {
        NOVIEW: '/assignment-3-car1sle/workout/',
		VIEW: path => `/assignment-3-car1sle/workout/${path || ':path'}`,
	},
};