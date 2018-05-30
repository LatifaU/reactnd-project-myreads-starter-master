import React from 'react'
import Book from './BookObject'

const Shelf = (props) =>
      <div key={props.id} className="bookshelf">
        <h2 className="bookshelf-title">{props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {Array.from(props.books).map((book)=>{
                console.log('book',book)
                return <Book key={book.id} info={book} shelfChanger={props.shelfChanger} />
              }
              )}
          </ol>
        </div>
      </div>


export default Shelf
