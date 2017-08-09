import React, { Component } from 'react';
import Button from './Components/Button'
import $ from 'jquery'
import './App.css'
import icon from './Spinner.svg'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quote: '',
      author: ''
    }
  }

  componentDidMount() {
    this.getQuote()
  }

  getQuote = () => {
    let url = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=?'
    $(".btn.newquote").prop("disabled", true)
    $("#author").addClass("no-margin")
    this.setState( {quote: `<img src=${icon} class="App-logo">`, author: ""} )
    $.getJSON( url, json => {
      $("#author").removeClass("no-margin")
      $(".btn.newquote").prop("disabled", false)
      let quote = json[0].content
      let author = "- " + json[0].title
      let len = quote.length
      // Check for tweetable length
      if (len > 140) {
        this.getQuote()
      } else {
        this.setState( {quote, author} )
      }
    })
  }

  tweetQuote = () => {
    let quote = $("#quote>p").text()
    let url = "https://twitter.com/intent/tweet?text=" + quote + this.state.author

    let win = window.open(url)
    if (win) {
      win.focus()
    } else {
      alert("Please allow popups for tweeting")
    }
  }

  render() {
    return (
      <main className="App">
        <header><h1>Qwotez</h1></header>
        <div className="nqbtn-container">
          <Button onclick={this.getQuote} text="Get New Quote" btntype="newquote"/>
        </div>
        <div className="tqbtn-container">
          <Button onclick={this.tweetQuote} text="Tweet Quote" btntype="tweetquote"/>
        </div>
        <div className="quotecontainer">
          <div id="quote" dangerouslySetInnerHTML={{__html: this.state.quote}}></div>
          <div id="author"><em>{this.state.author}</em></div>
        </div>
      </main>
    );
  }
}

export default App;
