import React from 'react'
import { Link } from 'react-router-dom'
import Book from './BookObject'

const SearchResult = (props) =>
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" title="Go back to Homepage"/>
          <div className="search-books-input-wrapper">
            <input type="text" onChange={(event)=> props.search(event.target.value)} placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {Array.from(props.result).map((book)=>
              <Book key={book.id} info={book} shelfChanger={props.shelfChanger}/>
            )}
          </ol>
        </div>
      </div>


export default SearchResult
