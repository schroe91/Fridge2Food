import React, { Component } from 'react';
import logo from '../logo.png';
import Converters from "./Converters";
import { NavLink } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import "./Recipe.css";
import StarRatings from 'react-star-ratings';
import ListGroup from 'react-bootstrap/ListGroup'

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.recipe,
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
      likeColor: "gray",
      totalLike: 0,
      nav: '',
    }

    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleReply = this.handleReply.bind(this);
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
    const index = newState.commentsList.findIndex(obj => obj.comment == ev.comment);
    if(ev.color === "blue") {
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
    this.setState({nav: a + this.state.id});
    console.log("nav " + this.state.nav);

    const first = '/api/recipes/';
    const second = this.state.id;
    const link = first + second;
    fetch(link)
      .then(response => response.json())
      .then(data => this.setState({
        ingredients: data.ingredients, name: data.name, calories: data.calories, carbs: data.carbs,
        date: data.date_added, prep_time: data.prep_time, prep_steps: data.prep_steps
      }))

    //TODO Fetch user favorite and rating and total favorites and rating from backend

  }

  handleRating(newRating) {
    this.setState({ rating: newRating });
  }

  handleCommentChange(ev) {
    this.setState({value: ev.target.value});
  }

  submitComment(ev) {
    ev.preventDefault();
    var newState = this.state;
    newState.commentsList.unshift({comment: this.state.value, replies: [], num: 0, color: "gray"});
    newState.value = "";

    this.setState(newState);
  }

  handleReply(ev) {

  }

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
                <i class="fa fa-heart fa-2x" id="favorite"></i>
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
            <ListGroup variant="flush">
              {this.state.commentsList.map((c) => (
                <div class="list-group-item" id="comment">
                  <li>{c.comment}</li>
                  <div id="commentButtons">
                    <button id="like" onClick={() => this.handleLike(c)} style={{ color: c.color }}>
                      <i class="fa fa-thumbs-up fa-lg" id="like" />
                    </button>
                    <label>{"(" + c.num + ")"}</label>
                    <button id="reply">Reply</button>
                  </div>
                </div>
              ))}
            </ListGroup>
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