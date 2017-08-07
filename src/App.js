import React, { Component } from 'react';
import Button from './Components/Button'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      number: 5,
      quote: null
    }
    this.getThing()
  }

  getThing = () => {
    axios
      .get('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=30')
      .then(result => {
        console.log(result)
        let rand = this.getRandomInt(0, 31)
        let len = result.data[rand].content.length
        this.setState({quote: result.data[rand].content})
      })
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  render() {
    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: this.state.quote}}></div>
        <Button onclick={this.getThing} text="Get JSON"/>
      </div>
    );
  }
}

export default App;
