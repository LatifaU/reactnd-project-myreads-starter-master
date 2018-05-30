import React,{ Component } from 'react'

class Book extends Component{
 render() {
  return (<li>
  <div className="book">
    <div className="book-top">
      <div className="book-cover" title={this.props.info.title + " by " + this.props.info.authors + " Book Cover"} style={{ width: 128, height: 190,
        backgroundImage: `url(${this.props.info.imageLinks && this.props.info.imageLinks.thumbnail})`
      }}>
      </div>
      <div className="book-shelf-changer" title="Change book shelf">
        <select value={this.props.info.shelf || 'none'} onChange={(evt)=> {
          this.props.shelfChanger(this.props.info,evt.target.value)
        }}>
          <option value="-1" disabled>Move to...</option>
          <option value="currentlyReading" title="Move book to CURRENTY READING shelf">Currently Reading</option>
          <option value="wantToRead" title="Move book to WANT TO READ shelf">Want to Read</option>
          <option value="read" title="Move book to READ shelf">Read</option>
          <option value="none" title="Move book to NONE shelf">None</option>
        </select>
      </div>
    </div>
    <div className="book-title" title={"Book Title: " + this.props.info.title}>
    {this.props.info.title}
    </div>
    {this.props.info.authors && Array.from(this.props.info.authors).map((author) =>
      <div key={author} className="book-authors" title={"Auther(s): " + this.props.info.authors}>{author}</div>
    )}
  </div>
  </li>)
}
}
export default Book;
