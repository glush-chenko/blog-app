import React, {useCallback, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {useParams, useNavigate} from 'react-router-dom';
import {articleStore} from '../../stores/ArticleStore';
import "./create-edit-article-style.css"

export const CreateEditArticlePage = observer(() => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [title, setTitle] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [content, setContent] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState<string | null>(null);

    useEffect(() => {
        if (id) {
            articleStore.setCurrentArticle(Number(id));
            if (articleStore.currentArticle) {
                setTitle(articleStore.currentArticle.title);
                setContent(articleStore.currentArticle.content);
                setAuthor(articleStore.currentArticle.author)

                if (articleStore.currentArticle.imageUrl) {
                    setImageUrl(articleStore.currentArticle.imageUrl);
                }
            }
        } else {
            articleStore.setCurrentArticle(null);
            setTitle('');
            setContent('');
            setImageUrl(null);
        }
    }, [id]);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            if (imageUrl) {
                articleStore.updateArticle(Number(id), title, content, author, imageUrl);
            } else {
                articleStore.updateArticle(Number(id), title, content, author);
            }
        } else {
            if (imageUrl) {
                articleStore.createArticle(title, content, author, imageUrl);
            } else {
                articleStore.createArticle(title, content, author);
            }
        }
        navigate('/');
    }, [id, navigate, imageUrl, title, content, author]);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageUrl(null);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImageUrl(null);
        }
    }, []);

    const handleRemoveArticle = useCallback(() => {
        if (id) {
            const confirmed = window.confirm("Вы уверены, что хотите удалить эту статью?");
            if (confirmed) {
                articleStore.removeArticle(Number(id));
                navigate('/');
            }
        }
    }, [id, navigate]);

    return (
        <div className="create-edit-article" onClick={e => e.stopPropagation()}>
            <div className="article-control">
                <h1 style={{width: "100%"}}>{id ? 'Редактирование статьи' : 'Публикация статьи'}</h1>
                {id && <button onClick={handleRemoveArticle}>Удалить статью</button>}
            </div>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label htmlFor="title">Название:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Описание:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group-bottom">
                    <div>
                        <p>Главная фотография:</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="author">Автор: </label>
                        <input
                            type="text"
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="form-group-button">
                    <button type="submit">Опубликовать</button>
                    <button onClick={() => navigate(`/article/${id}`)}>Вернуться к просмотру</button>
                </div>
            </form>
        </div>
    )
});