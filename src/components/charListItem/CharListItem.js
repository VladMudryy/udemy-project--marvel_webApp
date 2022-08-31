import { Component } from "react";
import PropTypes, { number } from "prop-types";

class CharListItem extends Component {
    constructor(props) {
        super(props)
    }
    
    onChangeId = () => {
        this.props.onCharSelected(this.props.id)
    }

    render() {
        let visibleObjectFit = '';
        if (this.props.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            visibleObjectFit = {objectFit: 'fill'}
        } else {
            visibleObjectFit = {objectFit: 'cover'}
        }

        return (
            <li className="char__item" onClick={this.onChangeId}>
                <img src={this.props.thumbnail} alt="abyss" style={visibleObjectFit}/>
                <div className="char__name">{this.props.name}</div>
            </li>
        )
    }
}

CharListItem.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharListItem;