import Recipes from "./components/recipes"
import React from "react"
import ReactDOM from "react-dom"

//loads if recipes id exists on page
if (document.getElementById("recipes")) {
  ReactDOM.render(<Recipes />, document.getElementById("recipes"))
}
