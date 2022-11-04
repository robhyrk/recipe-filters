import React, { useState, useEffect } from "react"

//components
import RecipesGrid from "./recipes-grid/recipes-grid"
import Filters from "./filters/filters"

//helpers
import { getProductType } from "../helpers/get-product-type"
import { getParams } from "../helpers/get-params"
import { translate } from "../helpers/translate"

const Recipes = () => {
  const [recipes, setRecipes] = useState([])
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [otherRecipes, setOtherRecipes] = useState([])
  const [filters, setFilters] = useState([])
  const [checked, setChecked] = useState([])

  //initial page load
  useEffect(() => {
    const path = window.location.pathname + window.location.search
    const params = getParams(path)
    fetch(`/wp-json/recipes/v2/results${params}`)
      .then(response => response.json())
      .then(data => {
        setRecipes(data.recipes)
        setFilters(data.products)
      })
  }, [])

  //watches for filter selection sets main recipes
  useEffect(() => {
    if (checked.length > 0) {
      const filterResults = recipes.filter(recipe => {
        return checked.includes(recipe.related_product_ID)
      })
      setFilteredRecipes(filterResults)
    }
  }, [checked])

  //watches for filter selection and sets other recipes
  useEffect(() => {
    if (checked.length === 1) {
      const results = recipes.filter(recipe => {
        return !checked.includes(recipe.related_product_ID)
      })
      const filterResults = recipes.filter(recipe => {
        return checked.includes(recipe.related_product_ID)
      })
      const cat = filterResults[0].related_product_type
      const otherResults = results.filter(recipe => {
        return recipe.related_product_type === cat
      })
      setOtherRecipes(otherResults)
    } else if (checked.length > 1) {
      const results = recipes.filter(recipe => {
        return !checked.includes(recipe.related_product_ID)
      })
      setOtherRecipes(results)
    }
  }, [checked])

  //watches for user filter selection
  const handleCheck = event => {
    event.target.checked ? setChecked([...checked, Number(event.target.value)]) : setChecked(checked.filter(val => val !== Number(event.target.value)))
  }

  if (recipes.length <= 0 && filters.length <= 0) {
    return <div class="loader"></div>
  } else {
    return (
      <>
        <Filters handleCheck={handleCheck} filters={filters} />
        <RecipesGrid checked={checked} recipes={checked.length <= 0 ? recipes : filteredRecipes} />
        {otherRecipes.length > 0 && checked.length > 0 && checked.length !== filters.length && (
          <div className="other-recipes-grid">
            <h2>
              {translate("Other")}&nbsp;
              {checked.length === 1 && <span className="recipe-cat-underline">{getProductType([otherRecipes[0].related_product_type])}</span>}
              {checked.length === 1 && <span>&nbsp;</span>}
              {translate("Recipes")}
            </h2>
            <RecipesGrid recipes={otherRecipes} />
          </div>
        )}
      </>
    )
  }
}

export default Recipes
