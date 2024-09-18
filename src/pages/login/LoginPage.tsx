import React, {useCallback} from "react";
import "./login-style.css"
import {useNavigate} from "react-router-dom";
import {setUserLoggedIn} from "../../utils/auth";
import {observer} from "mobx-react-lite";
import {authStore} from "../../stores/authStore";

export const LoginPage = observer(() => {
    const [usenarme, setUsenarme] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        authStore.setLoggedIn(true);
        authStore.setLoginModalOpen(false);
        setUserLoggedIn(true);
        navigate('/');
    }, [navigate]);

    const handleClose = useCallback(() => {
        authStore.setLoginModalOpen(false);
        navigate("/")
    }, [navigate])

    if (!authStore.isLoginModalOpen) {
        return null;
    }

    return (
        <div className="modal" onClick={handleClose}>
            <div className="login-container" onClick={e => e.stopPropagation()}>
                <div className="login-form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="login-text">
                            <h1>Вход</h1>
                            <span>Используй имя или почту</span>
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Usenarme"
                                value={usenarme}
                                onChange={(e) => setUsenarme(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="login-text">
                            <a href="#" className="forgot-password">Забыл пароль?</a>
                            <button type="submit">Войти</button>
                        </div>
                    </form>
                </div>

                <div className="login-info-container">
                    <div className="login-info">
                        <h1>Blog привествует тебя!</h1>
                        <p>Откройте увлекательные истории, вдохновляющие идеи и полезные советы.</p>
                        <p>Присоединяйтесь к нашему сообществу единомышленников и делитесь своими мыслями!</p>
                    </div>
                </div>
            </div>
        </div>
    )
});