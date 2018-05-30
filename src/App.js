////import React from 'react'
import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Search from './SearchFunction'
import Shelf from './ShelfObject'
import * as BooksAPI from './BooksAPI'
import './App.css'  

class BooksApp extends Component {
  state = {
     // TODO: Instead of using this state variable to keep track of which page
     // we're on, use the URL in the browser's address bar. This will ensure that
     // users can use the browser's back and forward buttons to navigate between
     // pages, as well as provide a good URL they can bookmark and share.
    currentlyReading: [],
    wantToRead: [],
    read: [],
    result: []
  }

  group = (books, key) => books.reduce((returnValue, current)=>{
    (returnValue[current[key]] = returnValue[current[key]] || []).push(current)
    return returnValue
  },{})

  componentDidMount(){
    BooksAPI.getAll().then((books)=> {
        const shelves = this.group(books, 'shelf')
        this.setState(shelves)
    })
  }

  shelfChanger = (book,shelf) =>
    BooksAPI.update(book,shelf).then((update) => {
      book.shelf !== shelf && this.setState((state) => ({
        [book.shelf]: (state[book.shelf] || []).filter((b)=> b.id !== book.id),
        [shelf]: (state[shelf] || []).concat(((b)=>{b.shelf=shelf; return b})(book))
    }))
  }) 

 search = (term) =>
    BooksAPI.search(term).then((books)=>{
      let booksObj = Object.values(this.state).reduce((rVal,current)=>rVal.concat(current),[]).reduce((rVal, current)=> {
        rVal[current.id]=current
        return rVal
      } ,{})
      this.setState({
        result: Array.from((books || [])).map((book)=> {
          (booksObj[book.id]&&(book.shelf=booksObj[book.id].shelf))||(book.shelf='none')
          return book
      })
    })
  }) 
  
  render() {
    return (
      <div className="app">
        <Route  path="/search" render={()=>
		/*
        NOTES: The search from BooksAPI is limited to a particular set of search terms.
        You can find these search terms here:
        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
        you don't find a specific author or title. Every search is limited by search terms.
        */
		//showSearchPage: false
          <Search result={this.state.result} shelfChanger={this.shelfChanger} search={this.search}/>
        }/>	 
         <Route exact path="/" render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf id="currentlyReading" books={this.state.currentlyReading} shelfChanger={this.shelfChanger} name="Currently Reading" />
                <Shelf id="wantToRead" books={this.state.wantToRead} shelfChanger={this.shelfChanger} name="Want to Read" />
                <Shelf id="read" books={this.state.read} shelfChanger={this.shelfChanger} name="Read" />
              </div>
            </div>
            <div className="open-search" title="Search by title or author">
              <Link to="/search">Search</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
