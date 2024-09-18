export const isUserLoggedIn = (): boolean => {
    return localStorage.getItem('isLoggedIn') === 'true';
};

export const setUserLoggedIn = (value: boolean): void => {
    localStorage.setItem('isLoggedIn', value.toString());
};
