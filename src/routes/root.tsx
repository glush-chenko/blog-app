import React, {useEffect} from "react";
import {isUserLoggedIn} from "../utils/auth";
import {Navigation} from "../components/header-nav/navigation";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {authStore} from "../stores/authStore";
import {HomePage} from "../pages/home/HomePage";
import {articleStore} from "../stores/ArticleStore";

export const Root = observer(() => {
    const isLoggedIn = isUserLoggedIn();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === "/login") {
            authStore.setLoginModalOpen(true)
        }

        if (articleStore.articles.length === 0) {
            articleStore.addTestArticles();
        }
    }, [location.pathname, navigate]);

    return (
        <>
            <Navigation isLoggedIn={isLoggedIn}/>
            <div style={{width: "100%", height: "95%", paddingTop: "1rem", boxSizing: "border-box"}}>
                <Outlet/>

                {location.pathname === "/login" && (
                    <HomePage/>
                )}
            </div>
        </>
    )
});