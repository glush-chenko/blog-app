import React from 'react';
import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';
import {articleStore} from '../../stores/ArticleStore';
import './home-style.css';

export const HomePage = observer(() => {
    return (
        <div className="home-page">
            <div className="article-list">
                {articleStore.articles.map((article) => {
                    const contentLength = article.imageUrl ? 35 : 100;

                    return (
                        <Link to={`/article/${article.id}`} key={article.id} className="article-card">
                            {article.imageUrl && (
                                <div className="article-image">
                                    <img
                                        src={article.imageUrl}
                                        alt="Article"
                                        style={{
                                            maxWidth: "10rem",
                                        }}
                                    />
                                </div>
                            )}
                            <div>
                                <h3 style={{fontWeight: "bold"}}>{article.title}</h3>
                                <p>{article.content.substring(0, contentLength)}{article.content.length > contentLength ? "..." : ""}</p>
                            </div>
                            <div className="article-footer">
                                <p style={{
                                    color: "gray",
                                    fontSize: "0.8rem"
                                }}>
                                    {new Date(article.dateCreated).toLocaleTimeString('ru-RU', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })},
                                    {new Date(article.dateCreated).toLocaleDateString('ru-RU', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
});