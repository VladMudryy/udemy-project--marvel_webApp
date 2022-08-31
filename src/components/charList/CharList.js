import { Component } from 'react';
import PropTypes from "prop-types";

import MarvelService from '../../services/MarvelService';
import CharListItem from '../charListItem/CharListItem';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';


class CharList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            charList: [],
            loading: true,
            error: false,
            newItemLoading: false, 
            offset: 600,
            charEnded: false
        }
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.onRequest()
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.loadCharList)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    loadCharList = (allChars) => {
        let ended = false;
        if (allChars.length < 9) {
            ended = true
        } 

        this.setState(({charList, offset}) => ({
            charList: [...charList, ...allChars],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    render() {
        const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;
        const newCharList = charList.map(item => {
            return <CharListItem thumbnail={item.thumbnail} name={item.name} key={item.id} id={item.id} onCharSelected={this.props.onCharSelected}/>
        })
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? (
            <ul className="char__grid">
                {newCharList}
            </ul>
        ) : null;
        return (
            <div className="char__list">
                    {errorMessage}
                    {spinner}
                    {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{display: charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;