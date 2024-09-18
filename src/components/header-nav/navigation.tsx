import React, {useCallback} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "./navigation-style.css"
import blog from "../../assets/blog.png"
import {observer} from "mobx-react-lite";
import {authStore} from "../../stores/authStore";

interface NavigationProps {
    isLoggedIn: boolean;
}

export const Navigation: React.FC<NavigationProps> = observer(({isLoggedIn}) => {
    const navigate = useNavigate();

    const handleAuthAction = useCallback(() => {
        if (authStore.isLoggedIn) {
            authStore.logout();
            navigate('/');
        } else {
            authStore.setLoginModalOpen(true);
            navigate('/login');
        }
    }, [navigate]);

    return (
        <nav className="navigation">
            <div className="nav-left">
                <Link to="/"><img src={blog} alt="logo-blog" style={{width: "35px"}}/></Link>
                <Link to={authStore.isLoggedIn ? "article/new" : "login"} className="nav-btn create-article-btn">Создать статью</Link>
                <a href="#" className="nav-btn create-article-btn">Популярное</a>
                <a href="#" className="nav-btn create-article-btn">Новости</a>
                <a href="#" className="nav-btn create-article-btn">Аналитика</a>
            </div>
            <div className="nav-links">
                <button onClick={handleAuthAction} className="nav-btn auth-btn">
                    {authStore.isLoggedIn ? 'Выйти' : 'Войти'}
                </button>
            </div>
        </nav>
    );
});