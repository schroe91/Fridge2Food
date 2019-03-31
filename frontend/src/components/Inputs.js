import React from "react"
const Inputs = (props) => {
  return (
    props.cats.map((val, idx)=> {
      let catId = `cat-${idx}`, ageId = `age-${idx}`
      return (
        <div key={idx}>
          <label htmlFor={catId}>{`Ingredient #${idx + 1}`}</label>
          <input
            type="text"
            name={catId}
            data-id={idx}
            id={catId}
            value={props.cats[idx].name} 
            className="name"
          />
          <label htmlFor={ageId}>Amount</label>
          <input
            type="text"
            name={ageId}
            data-id={idx}
            id={ageId}
            value={props.cats[idx].age} 
            className="age"
          />
        </div>
      )
    })
  )
}
export default Inputs