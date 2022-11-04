//replaces words on page if loaded in French
export const translate = word => {
  const path = window.location.search
  if (path.endsWith("=fr")) {
    if (word === "Other") {
      return "Autre"
    } else if (word === "Recipes") {
      return "Recettes"
    } else {
      return word
    }
  } else {
    return word
  }
}
