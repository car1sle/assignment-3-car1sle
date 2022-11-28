export const PATHS = {
	HOME: '/assignment-2-car1sle/',
    ADD: '/assignment-2-car1sle/add',
    WORKOUT: {
        NOVIEW: '/assignment-2-car1sle/workout/',
		VIEW: path => `/assignment-2-car1sle/workout/${path || ':path'}`,
	},
};