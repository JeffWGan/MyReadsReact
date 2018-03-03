import React, {Component} from 'react'
import PropTypes from 'prop-types'
import MyReadsBook from './MyReadsBook';
import MyReadsShelves from '../enums/MyReadsShelves';
import escapeRegExp from 'escape-string-regexp'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class MyReadsSearchResults extends Component {
    static propTypes = {
        showingBooks: PropTypes.array.isRequired
    }
    
    state = {
        query: ''
        , currentShelf: MyReadsShelves.CURRENTLY_READING.value
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
        const { showingBooks } = this.props
        const { query, currentShelf } = this.state

        let booksToShow
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            booksToShow = showingBooks.filter((book) => match.test(book.title))
        } else {
            booksToShow = showingBooks
        }
        
        return (

            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                    {/* <a className="close-search" onClick={() => history.push('/')}>Close</a> */}
                    <Link
                        to='/'
                        className='close-search'>Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                    </div>
                    <div className="search-books-results">
                    <ol className="books-grid"></ol>
                    </div>
                </div>


                <div className="list-books-content">
                    <div>
                        <div className="bookshelf-books">
                            <ol className="books-grid">

                                {booksToShow.map((filteredBook) => (
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
                </div>

            </div>

        
    )}
}

export default MyReadsSearchResults