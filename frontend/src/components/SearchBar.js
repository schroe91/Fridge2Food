import React from "react";

class SearchBar extends React.Component {

    constructor(props) {
          super(props);
          this.state = {
            toSearch:'',
          }
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
      }
    /*search(toSearch) {
      console.log(toSearch);
      fetch('http://127.0.0.1:5000/api/recipe', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({recipe: toSearch})
      }).then( response => response.ok ).then(success => ( success ? this.setState({isAuth: success}) : this.setState({error: {message: "Incorrect email/password"}})))
    }*/
      handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    
    
    _handleKeyPress = (e) => {
        const {toSearch} = this.state;
        if (e.key === 'Enter') {
          console.log('do validate');
          console.log(toSearch);
          this.search(toSearch);
        }
    }
      handleSubmit(ev) {
      ev.preventDefault();
      const {toSearch} = this.state;
      this.search(toSearch);
      this.setState({
        toSearch: '',
          });
    }
    
    render(){
      return (
        <div>
            <input type="text" name="toSearch" placeholder="Search for recipe" size="22" 
        onChange={this.handleChange} value={this.state.toSearch} onKeyPress={this._handleKeyPress}/>
        </div>
      )
    }
  }
  export default SearchBar;