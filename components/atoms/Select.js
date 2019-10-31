import React from 'react'
import PropTypes from 'prop-types'

const Select = ({ options, value, onSelect }) => {
  const handleOnSelect = e => {
    onSelect(e.target.value)
  }
  return (
    <div className="zi-select-container small">
      <select className="zi-select" onChange={handleOnSelect} value={value}>
        {options.map(({ value: optValue, label }) => {
          const isSelected = optValue === value
          return <option key={optValue}>{label}</option>
        })}
      </select>
      <i className="arrow zi-icon-up"></i>
    </div>
  )
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  ),
  value: PropTypes.string,
  onSelect: PropTypes.func
}

Select.defaultProps = {
  options: [],
  value: '',
  onSelect: () => null
}

export default Select
