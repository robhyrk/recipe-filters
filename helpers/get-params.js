//checks parameters in path and loads appropriate recipes: FR/EN, non/alcohol
export const getParams = path => {
  let params

  if (path.endsWith("alcoholic-recipes/")) {
    params = "?type=alc&lang=en"
  } else if (path.endsWith("alcoholic-recipes/?lang=fr")) {
    params = "?type=alc&lang=fr"
  } else if (path.endsWith("recipes/")) {
    params = "?type=non&lang=en"
  } else if (path.endsWith("recipes/?lang=fr")) {
    params = "?type=non&lang=fr"
  }

  return params
}
