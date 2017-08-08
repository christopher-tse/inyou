import React, { Component } from 'react';
import Button from './Components/Button'
import $ from 'jquery'

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
    this.setState( {quote: "<p>Loading...</p>"} )
    $.getJSON( url, json => {
      console.log(json)
      let quote = json[0].content
      let len = quote.length
      if (len > 150) {
        this.getQuote()
      } else {
        this.setState( {quote} )
      }
    })
  }

  render() {
    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: this.state.quote}}></div>
        <Button onclick={this.getQuote} text="Get New Quote"/>
      </div>
    );
  }
}

export default App;
