import React, { Component } from 'react';
import logo from '../logo.png';
import Converters from "./Converters";
import { NavLink } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import "./Recipe.css";
import StarRatings from 'react-star-ratings';

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.recipe,
      username: '',
      name: '',
      ingredients: [],
      calories: '',
      carbs: '',
      date: '',
      prep_time: '',
      prep_steps: '',
      commentsList: [],
      favColor: "gray",
      totalFavorite: 0,
      rating: 0,
      totalRating: 0,
      nav: '',
      recipeId: 0,
      value: '',
      value2: '',
    }

    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleReplyChange = this.handleReplyChange.bind(this);
    this.submitReply = this.submitReply.bind(this);
//    this.getUser = this.getUser.bind(this);
  }

  handleFavorite(ev) {
    if (this.state.favColor === "gray") {
      this.setState({ favColor: "rgb(255, 115, 0)", totalFavorite: this.state.totalFavorite + 1 });
    }
    else {
      this.setState({ favColor: "gray", totalFavorite: this.state.totalFavorite - 1 });
    }
  }

  handleLike(ev) {
    var newState = this.state;
    const index = newState.commentsList.findIndex(obj => obj.comment === ev.comment);
    if (ev.color === "blue") {
      ev["color"] = "gray";
      ev["num"] -= 1;
      newState.commentsList[index] = ev;
      this.setState(newState);
    }
    else {
      ev["color"] = "blue";
      ev["num"] += 1;
      newState.commentsList[index] = ev;
      this.setState(newState);
    }
  }

  componentDidMount() {
    const a = "/ForkRecipe/";
    this.setState({ nav: a + this.state.id });
    console.log("nav " + this.state.nav);

      const first = '/api/recipes/';
      const second = this.state.id;
      const link = first + second;
      const request = async() => {
	  const response = await fetch(link);
	  const data = await response.json();
	  this.setState({
              ingredients: data.ingredients,
	      name: data.name,
	      calories: data.calories,
	      carbs: data.carbs,
              date: data.date_added,
	      prep_time: data.prep_time,
	      prep_steps: data.prep_steps, 
              commentsList: data.comments,
	      recipeId: data.id,
	      rating: data.user_rating,
	      totalRating: data.rating
	  });
	  console.log(data.comments);
      };

      request();
      
    //Get current username
    fetch("/api/users/current")
      .then(data => this.setState({id: data.id, username: data.username}))
  }

    handleRating(newRating) {
	const oldRating = this.state.rating;
      this.setState({ rating: newRating });
      const request = async() => {
	  const response = await fetch("/api/recipes/"+this.state.recipeId+"/ratings",{
	      method: "POST",
	      headers: {
		  'Content-Type': 'application/json'
	      },
	      body: JSON.stringify({rating: newRating})
	  });
	  //console.log(this.state.rating)
	  if(!response.ok){
	      const data = await response.json();
	      this.setState({
		  rating: oldRating,
		  totalRating: data.rating
	      });
	  }
      }
	request()
    }

  handleCommentChange(ev) {
    this.setState({ value: ev.target.value });
  }

  submitComment(ev) {
    ev.preventDefault();
    var newState = this.state;
    newState.commentsList.unshift({ comment: this.state.value, replies: []});
    
    //Submit to backend
    const link = "/api/recipes/" + this.state.recipeId + "/comments";
    fetch(link, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({comment: this.state.value})
    })

    newState.value = "";
    this.setState(newState);
  }

  handleReplyChange(ev) {
    this.setState({ value2: ev.target.value });
  }

  submitReply(ev, c) {
    ev.preventDefault();
    var newState = this.state;
    const index = newState.commentsList.findIndex(obj => obj.comment === c.comment);
    newState.commentsList[index].comments.push(this.state.value2);

    //Submit to backend
      const link = "/api/recipes/" + this.state.recipeId + "/comments/" + this.state.commentsList[index].comment_id;
      const request = async() =>{
	  const response = await fetch(link, {
	      method: "POST",
	      headers: {
		  'Content-Type': 'application/json'
	      },
	      body: JSON.stringify({comment: this.state.value2})
	  })
	  if(response.ok){
	      window.location.reload();
	  }
      };
      request();
      window.location.reload();
      newState.value2 = "";
      this.setState(newState);
  }

/*  getUser(userId) {
    var user = "";
      const link = "/api/users/" + userId;
      const response = await fetch(link, {
	  method: "GET",
	  headers: {
              'Content-Type': 'application/json'
	  },
      });

      const data = await response.json();
      return data.username;
  }*/

  render() {
    return (
      <div id="layout">
        <div id="top-border">
          <img src={logo} alt="" id="logo" />
          <h2 id="title">Fridge2Food</h2>
          <button className="button" id="login">
            <NavLink exact to="/" activeClassName="active">Home</NavLink>
          </button>
        </div>
        <div id="pageStyle">
          <div>
            <div id="interactions">
              <h2>Recipe: {this.state.name}</h2>
              <label id="favLabel">Favorite!</label>
              <button
                onClick={this.handleFavorite}
                id="favorite"
                style={{ color: this.state.favColor }}
              >
                <i className="fa fa-heart fa-2x" id="favorite"></i>
              </button>
              <label id="totalFav">{"(" + this.state.totalFavorite + ")"}</label>
              <label id="rateLabel">Rate!</label>
              <StarRatings
                rating={this.state.rating}
                starRatedColor="orange"
                changeRating={this.handleRating}
                numberOfStars={5}
                name="rating"
                starDimension="30px"
                starSpacing="0px"
              />
              <label>{"(" + this.state.totalRating + ")"}</label>
            </div>
            <p>Prep time: {this.state.prep_time} hours</p>
            <p>{this.state.calories} calories</p>
            <p>{this.state.carbs} carbs</p>
            <h2>Ingredients:</h2>
            <ul>
              {this.state.ingredients.map(ingredient => {
                return <li key={`ingredient-${ingredient.id}`}>{ingredient.name}</li>
              })}
            </ul>
            <h2>Steps:</h2>
            <p>{this.state.prep_steps}</p>
            <p>Date created: {this.state.date}</p>
            <h2 id="commentHeader">Comments</h2>
            <form onSubmit={this.submitComment} id="commentForm">
              <input
                type="text"
                name="commentInput"
                placeholder="Leave a comment"
                value={this.state.value}
                onChange={this.handleCommentChange}
              />
            </form>
            {this.state.commentsList.map((c, index) => (
              <div key={index + "-" + c.comment}>
                <div className="list-group-item" id="comment">
                  <p>
                    {c.username + " says: " + c.comment}
                  </p>
                </div>
                <div id="replyList">
                  {c.comments.map((reply, index) => (
                    <p key={index + "-" + reply.comment}>
                      {reply.username + " says: " + reply.comment}
                    </p>
                  ))}
                </div>
                <div id="reply">
                  <form onSubmit={(e) => this.submitReply(e, c)} id="replyForm">
                    <input
                      type="text"
                      name="replyInput"
                      placeholder="Leave a reply"
                      value={this.state.value2}
                      onChange={this.handleReplyChange}
                    />
                  </form>
                </div>
              </div>
            ))}
          </div>
          <div id="rightSideBar">
            <Converters />
            <div>
              <button className="button" id="tosubs"><NavLink exact to="/substitutions" activeClassName="active">Ingredient Substutitions</NavLink></button>
            </div>
            <div>
              <button className="button" id="fork"><NavLink exact to={this.state.nav} activeClassName="active">Fork Recipe</NavLink></button>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
export default Recipe;
/**<div id="likeButton">
                    <button id="like" onClick={() => this.handleLike(c)} style={{ color: c.color }}>
                      <i className="fa fa-thumbs-up fa-lg" id="like" />
                    </button>
                    <label>{"(" + c.num + ")"}</label>
                  </div> */
