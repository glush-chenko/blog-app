import React, {useCallback, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {articleStore} from '../../stores/ArticleStore';
import {formatDate} from "../../utils/formatDate";
import "./article-page-style.css"
import {isUserLoggedIn} from "../../utils/auth";

export const ArticlePage = observer(() => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isLoggedIn = isUserLoggedIn();

    useEffect(() => {
        if (id) {
            articleStore.setCurrentArticle(Number(id));
        }
    }, [id]);

    const handleToggleEdit = useCallback(() => {
        navigate(`/article/edit/${id}`)
    }, [id, navigate]);

    const handleLike = useCallback(() => {
        if (articleStore.currentArticle) {
            articleStore.toggleLike(articleStore.currentArticle.id);
        }
    }, []);

    if (!articleStore.currentArticle) {
        return <div>Article not found</div>;
    }

    const formattedDate = formatDate(new Date(articleStore.currentArticle.dateCreated));

    return (
        <div className="article-page" onClick={e => e.stopPropagation()}>
            <div className="article-container">
                <div className="article-container-info">
                    <div className="article-info">
                        <p>ОПУБЛИКОВАНО {formattedDate}</p>
                        <span style={{fontWeight: "500"}}>Нравится: {articleStore.currentArticle.likes}</span>
                    </div>
                    <h1>{articleStore.currentArticle.title}</h1>
                    {articleStore.currentArticle.imageUrl && (
                        <div
                            className="article-image"
                             // style={{height: "30rem"}}
                        >
                            <img src={articleStore.currentArticle.imageUrl} alt="main-photo"/>
                        </div>
                    )}
                    <pre
                        style={{
                            whiteSpace: 'pre-wrap',
                            wordWrap: 'break-word',
                            fontFamily: "match"
                        }}
                    >
                        {articleStore.currentArticle.content}
                    </pre>
                    <p style={{color: "grey"}}>Автор: {articleStore.currentArticle.author}</p>
                </div>
                <div className="article-actions-buttons">
                    <div className="article-actions">
                        {isLoggedIn && (<button onClick={handleToggleEdit}>Редактировать</button>)}
                        <button onClick={handleLike}>Нравится</button>
                    </div>
                    <button onClick={() => navigate('/')} className="article-actions">Вернуться на главную</button>
                </div>
            </div>

            <div className="last-news">
                <h2>Последние новости</h2>
                {articleStore.articles.slice(0, 5).map(article => (
                    <Link
                        to={`/article/${article.id}`}
                        key={article.id}
                        className="article-card"
                        style={{flexBasis: "auto", flexGrow: 0}}
                    >
                        <div>
                            <h3>{article.title}</h3>
                        </div>
                        <div className="article-footer">
                            <p
                                style={{
                                    color: "gray",
                                    fontSize: "0.8rem"
                                }}
                            >
                                {new Date(article.dateCreated).toLocaleTimeString('ru-RU', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                })}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
});