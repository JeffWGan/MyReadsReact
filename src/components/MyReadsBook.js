import React from 'react'
import MyReadsShelves from '../enums/MyReadsShelves';

const MyReadsBook = (props) => (

    <div className="book">
    <div className="book-top">
        {props.book.imageLinks !== undefined && 
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.book.imageLinks.smallThumbnail})` }}></div>
        }
        
        <div className="book-shelf-changer">

        <select onChange={(event) => props.onShelfChanged(props.book, event)} value={"shelf" in props.book ? props.book.shelf : MyReadsShelves.NONE.value }>
            <option value="nothing" disabled>Move to...</option>
            {MyReadsShelves.enumValues.map(({value, description}) => (
                <option key={value} value={value}>{description}</option>
                ))
            }
            
        </select>
        </div>
    </div>
    <div className="book-title">{props.book.title}</div>
    <div className="book-authors">{props.book.authors !== undefined && props.book.authors}</div>
    </div>
)

export default MyReadsBook