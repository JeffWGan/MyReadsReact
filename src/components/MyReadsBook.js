import React, {Component} from 'react'
import PropTypes from 'prop-types'

class MyReadsBook extends Component {
    static propTypes = {
        title: PropTypes.string
        , authors: PropTypes.array
        , shelf: PropTypes.oneOf(['currentlyReading', 'wantToRead', 'read'])
        , imageUrl: PropTypes.string.isRequired
    }

    state = {
        
    }

    onShelfChanged = (event) => {

    }

    render() {
        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.imageUrl})` }}></div>
                <div className="book-shelf-changer">
                    <select onChange={this.onShelfChanged}>
                    <option value="nothing" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">this.props.title</div>
                <div className="book-authors">this.props.author</div>
            </div>

        )
    }
}

export default MyReadsBook