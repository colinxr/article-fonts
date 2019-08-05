import React, { useState, useEffect } from 'react'

function Form(props) {

  const [searchValue, setSearchValue] = useState('')
  const [checkedItems, setCheckedItems] = useState(props.exts)
  const [showOptions, setShowOptions] = useState(false)

  const handleTextChange = evt => setSearchValue(evt.target.value)

  const handleCheckboxChange = (evt, key) => {
    setCheckedItems(prevState => {
      const newState = prevState.map((item, i) => {
        const newValue = {...item}

        if (i === key) newValue.checked = !newValue.checked

        return newValue
      })
      
      return newState
    })
  }

  const handleFocus = () => setShowOptions(true)

  const handleSubmit = evt => {
    evt.preventDefault()
    props.setSearchVal(searchValue)
    props.setExts(checkedItems)
    props.setIsLoading(true)
  }

  const fetchApiResults = (val, exts) => {
    fetch('/api/')
    .then(data => props.setResults(data))
    .then(resp => props.setIsLoading(false))
  }

  return (
    <form onSubmit={ handleSubmit }>
      <div className="form__main">
          <input 
            type="text"
            name="searchVal"
            value={ searchValue }
            onChange={ handleTextChange }
            onFocus={handleFocus}
        />
        <input type="submit" value="submit" />
      </div>
      {
        showOptions && 
          <div className="form__options">
            {
              checkedItems.map((ext, i) => {
                return (
                  <span key={ i }>
                    <input 
                      type="checkbox" 
                      name={ ext.name } 
                      checked={ checkedItems[i].checked } 
                      id={ ext.name }
                      onChange={ e => handleCheckboxChange(e, i) }
                      /> 
                    { ext.name }
                  </span>
                )
              })
            }
          </div>
      }
    </form>
  )
}

export default Form