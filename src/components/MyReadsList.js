import React, {Component} from 'react'
import PropTypes from 'prop-types'
import MyReadsBook from './MyReadsBook';
import MyReadsShelves from '../enums/MyReadsShelves';

class MyReadsList extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    }
    
    state = {
    }

    onShelfChanged = (book, event) => {
        if (this.props.onShelfUpdate)
            this.props.onShelfUpdate(book, event.target.value)
    }

      render() {
          const { books } = this.props
          
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
                    ))}
                    {/* end of map showingShelves */}
                </div>
            </div>
        )
      }
}

export default MyReadsList