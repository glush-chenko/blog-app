import { makeAutoObservable } from 'mobx';

class AuthStore {
    isLoggedIn: boolean = false;
    isLoginModalOpen: boolean = false;
    isRegistered: boolean = false;

    constructor() {
        makeAutoObservable(this);
        this.loadAuthState();
    }

    loadAuthState() {
        const loggedIn = localStorage.getItem('isLoggedIn');

        if (loggedIn) {
            this.isLoggedIn = loggedIn === 'true';
        }
    }

    setLoggedIn(value: boolean) {
        this.isLoggedIn = value;
        localStorage.setItem('isLoggedIn', value.toString());
    }

    setLoginModalOpen(value: boolean) {
        this.isLoginModalOpen = value;
    }

    logout() {
        this.setLoggedIn(false);
        this.setLoginModalOpen(true);
    }
}

export const authStore = new AuthStore();
