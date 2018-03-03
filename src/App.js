import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import MyReadsBook from './components/MyReadsBook';
import MyReadsList from './components/MyReadsList';
import MyReadsShelves from './enums/MyReadsShelves';
import MyReadsSearchResults from './components/MyReadsSearchResults';
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
    , books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  onShelfChanged = (book, shelf) => {
    BooksAPI.update(book, shelf).then(resultShelf => { 
      book.shelf = shelf
      let updatedBooks = this.state.books.filter((filteredBook) => filteredBook.title !== book.title)
        this.setState(state => ({
          books: updatedBooks.concat(book)
        }))        
    })
}

  render() {
    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
            <MyReadsSearchResults
            showingBooks={this.state.books}
            onShelfUpdate={(book, shelf) => {
              this.onShelfChanged(book, shelf)
            }}
          />
        )}/>

        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <MyReadsList 
              books={this.state.books}
              onShelfUpdate={(book, shelf) => {
                this.onShelfChanged(book, shelf)
              }}
            />
            <div className="open-search">
              {/* <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a> */}
              <Link
                to='/search'
                className='open-search'>Add a book
              </Link>
            </div>
          </div>
        )}/>

      </div>
    )
  }
}

export default BooksApp
