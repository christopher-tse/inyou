import React, { Component } from 'react';
import Button from './Components/Button'
import $ from 'jquery'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quote: ''
    }
  }

  componentDidMount() {
    this.getQuote()
  }

  getQuote = () => {
    let url = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=?'
    $(".btn.newquote").prop("disabled", true)
    this.setState( {quote: "<p>Loading...</p>"} )
    $.getJSON( url, json => {
      $(".btn.newquote").prop("disabled", false)
      let quote = json[0].content
      let len = quote.length
      if (len > 140) {
        this.getQuote()
      } else {
        this.setState( {quote} )
      }
    })
  }

  tweetQuote = () => {
    let quote = $("#quote>p").text()
    let url = "https://twitter.com/intent/tweet?text=" + quote

    let win = window.open(url)
    if (win) {
      win.focus()
    } else {
      alert("Please allow popups for tweeting")
    }
  }

  render() {
    return (
      <div className="App">
        <div id="quote" dangerouslySetInnerHTML={{__html: this.state.quote}}></div>
        <Button onclick={this.getQuote} text="Get New Quote" btntype="newquote"/>
        <Button onclick={this.tweetQuote} text="Tweet Quote" btntype="tweetquote"/>
      </div>
    );
  }
}

export default App;
