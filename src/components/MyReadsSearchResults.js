import React, {Component} from 'react'
import MyReadsBook from './MyReadsBook';
import { Link } from 'react-router-dom'
import * as BooksAPI from '.././BooksAPI'

class MyReadsSearchResults extends Component {
    state = {
        query: ''
        , searchResult: []
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
        BooksAPI.search(query.trim())
        .then((books) => {
            this.setState({ searchResult: books })
        })
        .catch(function(error) {
            console.log("oops "+error);
        })
    }

    clearQuery = () => {
        this.setState({ query: '' })
    }

    onShelfChanged = (book, event) => {
        if (this.props.onShelfUpdate)
            this.props.onShelfUpdate(book, event.target.value)
    }

    render() {
        const { query, searchResult } = this.state
        
        return (

            <div>
                <div className="search-books">
                    <div className="search-books-bar">
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

                                {searchResult !== undefined && searchResult.map !== undefined && searchResult.map((filteredBook) => (
                                    <li key={filteredBook.id}>
                                        <MyReadsBook
                                        book={filteredBook}
                                        onShelfChanged={this.onShelfChanged}
                                        />
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