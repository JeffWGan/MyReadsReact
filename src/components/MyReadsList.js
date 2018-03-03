import React, {Component} from 'react'
import PropTypes from 'prop-types'
import MyReadsBook from './MyReadsBook';
import MyReadsShelves from '../enums/MyReadsShelves';
import escapeRegExp from 'escape-string-regexp'

class MyReadsList extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired
        // , shelves: PropTypes.array.isRequired
    }
    
    state = {
    query: '',
    currentShelf: MyReadsShelves.CURRENTLY_READING.value
    }

    updateQuery = (query) => {
    this.setState({ query: query.trim() })
    }

    clearQuery = () => {
    this.setState({ query: '' })
    }

    onShelfChanged = (book, event) => {
        if (this.props.onShelfUpdate)
            this.props.onShelfUpdate(book, event.target.value)
    }

      render() {
          const { books } = this.props
          const { query, currentShelf } = this.state

          let showingShelves = MyReadsShelves.enumValues
          
          return (
            <div className="list-books-content">
                <div>
                    
                    {showingShelves.map((shelf) => (
                        <div key={shelf.value} className="bookshelf">
                        <h2 className="bookshelf-title">{shelf.description}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">

                            {books.filter((book) => book.shelf === shelf.value)
                                .map((filteredBook) => (
                                <li key={filteredBook.title}>
                                
                                <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${filteredBook.imageLinks.smallThumbnail})` }}></div>
                                    <div className="book-shelf-changer">

                                    <select onChange={(event) => this.onShelfChanged(filteredBook, event)} value={filteredBook.shelf}>
                                        <option value="nothing" disabled>Move to...</option>
                                        {MyReadsShelves.enumValues.map((option) => (
                                            <option key={option.value} value={option.value}>{option.description}</option>
                                            ))
                                        }
                                        
                                    </select>
                                    </div>
                                </div>
                                <div className="book-title">{filteredBook.title}</div>
                                <div className="book-authors">{filteredBook.authors}</div>
                                </div>
                                </li>
                            ))}
                            {/* end of book filter */}
                            </ol>
                        </div>
                        </div>
                    ))}
                    {/* end of map showingShelves */}
                </div>
            </div>
        )
      }
}

export default MyReadsList