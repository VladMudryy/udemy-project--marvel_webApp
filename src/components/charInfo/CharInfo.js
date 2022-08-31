import { Component } from 'react';
import PropTypes from "prop-types";

import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';

import './charInfo.scss';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charId} = this.props
        if (!charId) {
            return;
        }
        
        this.onCharLoading();
        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false})
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }

    onCharLoading = () => {
        this.setState({loading: true})
    }


    render() {
        const {char, loading, error} = this.state;

        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    
    let visibleDescription = '';
    if (description) {
        if (description.length > 200) {
            visibleDescription = `${description.slice(0, 200)}...`
        } else {
            visibleDescription = description
        }
    } else {
        visibleDescription = 'There is no description, for familiarization follow the link'
    }

    let comicsArr = comics.map((item, i) => {
        return (
            <li key={i} className="char__comics-item">
                {item.name}
            </li>
        )
    });

    if (comics.length > 10) {
        comicsArr.splice(0, 10)
    } else if (comics.length === 0) {
        comicsArr = 'There is no comics, for familiarization follow the link'
    }

    let visibleObjectFit = {};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        visibleObjectFit = {objectFit: 'fill'}
    } else {
        visibleObjectFit = {objectFit: 'cover'}
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={visibleObjectFit}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {visibleDescription}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsArr}
                
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}


export default CharInfo;