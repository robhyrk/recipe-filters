//checks product type and returns title depending if loaded in French or English
export const getProductType = key => {
  const path = window.location.search
  const fr = path.endsWith("=fr")
  const PRODUCT_TYPES = {
    prem: "Premium",
    ginger: fr ? "Soda gingembre" : "Ginger Ale",
    club: fr ? "Soda club" : "Club Soda",
    tonic: fr ? "Soda tonique" : "Tonic Water",
    alc: fr ? "Alcoolique" : "Alcoholic"
  }
  return PRODUCT_TYPES[key]
}
