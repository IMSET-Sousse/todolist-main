import React from 'react';
import './Form.css';  // Ensure the CSS file is imported

function Form({ description, setDescription, onAddItem }) {
  return (
    <div className="form-container">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add a new task"
        className="input-field"
      />
      <button 
        onClick={() => onAddItem(description)} 
        className="add-button"
      >
        Add
      </button>
    </div>
  );
}

export default Form;
