import React from 'react';
import { Check } from 'lucide-react';
import './Form.css';

const Item = ({ id, taskname, date, selected, onToggleItem, onDeleteItem }) => {
  return (
    <li className="list-item">
      <div className="item-content">
        {/* Custom checkbox */}
        <label className="custom-checkbox">
          <input 
            type="checkbox" 
            checked={selected} 
            onChange={() => onToggleItem(id)} 
          />
          {selected ? (
            <span className="checkmark filled">
              {/* Optional: Include an icon or styling */}
            </span>
          ) : (
            <span className="checkmark"></span>
          )}
        </label>

        {/* Task details */}
        <div className="task-details">
          <span className={`description ${selected ? 'selected' : ''}`}>
            {taskname}
          </span>
          <span className="task-date">{new Date(date).toLocaleString()}</span>
        </div>
      </div>

      {/* Delete button */}
      <button 
        className="delete-btn" 
        onClick={() => onDeleteItem(id)} 
        aria-label="Delete task"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </li>
  );
};

export default Item;
