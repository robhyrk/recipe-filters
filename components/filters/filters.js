import React from "react"

const Filters = ({ filters, handleCheck }) => {
  return (
    <div className="filters" id="filters" style={{ display: "none" }}>
      {filters.map(filter => {
        if (filter.length > 1 && filter[0] !== null)
          return (
            <div key={filter[1]} class="filter-item">
              <input onClick={e => handleCheck(e, filters)} type="checkbox" id={filter[1]} name={filter[0]} value={filter[1]} />
              <label for={filter[1]}>{filter[0]}</label>
            </div>
          )
      })}
    </div>
  )
}

export default Filters
