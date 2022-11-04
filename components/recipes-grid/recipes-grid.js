import React from "react"

const RecipesGrid = ({ recipes }) => {
  return (
    <div className="recipes-grid">
      {recipes.map(({ id, title, url, img }) => {
        return (
          <a key={id} href={url} class="recipe-grid-item">
            <article style={{ backgroundImage: `url(${img})` }}></article>
            <h2 className="recipe-title" dangerouslySetInnerHTML={{ __html: title }}></h2>
          </a>
        )
      })}
    </div>
  )
}

export default RecipesGrid
