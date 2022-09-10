import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);

    const {loading, error, getAllComics, clearError} = useMarvelService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = () => {
        getAllComics()
            .then(res => setComicsList(state => [...state, ...res]))
    }

    const renderComics = () => {
        const items = comicsList.map(item => {
            return (
                <li key={item.id} className="comics__item">
                    <a href="#">
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderComics(comicsList);

    return (
        <div className="comics__list">
            {items}
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;