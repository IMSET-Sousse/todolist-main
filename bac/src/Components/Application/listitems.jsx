// import React, { useState } from 'react';
// import axios from 'axios'; // Make sure you import Axios
// import './Form.css';

// function ListItem({ items, onModifyTask }) {
//   const [editingTaskId, setEditingTaskId] = useState(null);
//   const [editedDescription, setEditedDescription] = useState("");

//   // Function to save the edited task
//   const handleSave = (taskId) => {
//     // Call onModifyTask which will handle the PUT request
//     onModifyTask(taskId, editedDescription);
//     setEditingTaskId(null);
//     setEditedDescription("");
//   };

//   return (
//     <ul className="list-container">
//       {items.map((item) => (
//         <li key={item.id} className="list-item">
//           <div className="item-content">
//             {/* Checkbox for marking task as completed */}
//             <input
//               type="checkbox"
//               checked={item.completed}
//               className="task-checkbox"
//             />

//             {/* Buttons for edit and delete */}
//             {editingTaskId === item.id ? (
//               <>
//                 <input
//                   type="text"
//                   value={editedDescription}
//                   onChange={(e) => setEditedDescription(e.target.value)}
//                   className="edit-input"
//                 />
//                 <button
//                   className="save-button"
//                   onClick={() => handleSave(item.id)}
//                 >
//                   Save
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button
//                   className="edit-button"
//                   onClick={() => {
//                     setEditingTaskId(item.id);
//                     setEditedDescription(item.taskname);
//                   }}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="delete-button"
//                 >
//                   Delete
//                 </button>
//                 {/* Apply the completed class if the task is marked as completed */}
//                 <span
//                   className={`description ${item.completed ? "completed" : ""}`}
//                 >
//                   {item.taskname}
//                 </span>
//                 <span className="task-date">
//                   {new Date(item.date).toLocaleString()}
//                 </span>
//               </>
//             )}
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default ListItem;
import React, { useState } from 'react';
import axios from 'axios'; // Make sure you import Axios
import './Form.css';

function ListItem({ items, onModifyTask, onDeleteTask }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");

  // Function to save the edited task
  const handleSave = (taskId) => {
    // Call onModifyTask which will handle the PUT request
    onModifyTask(taskId, editedDescription);
    setEditingTaskId(null);
    setEditedDescription("");
  };

  // Function to delete the task
  const handleDelete = (taskId) => {
    onDeleteTask(taskId); // Call the onDeleteTask function passed from the parent
  };

  return (
    <ul className="list-container">
      {items.map((item) => (
        <li key={item.id} className="list-item">
          <div className="item-content">
            {/* Checkbox for marking task as completed */}
            <input
              type="checkbox"
              checked={item.completed}
              className="task-checkbox"
            />

            {/* Buttons for edit and delete */}
            {editingTaskId === item.id ? (
              <>
                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="edit-input"
                />
                <button
                  className="save-button"
                  onClick={() => handleSave(item.id)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  className="edit-button"
                  onClick={() => {
                    setEditingTaskId(item.id);
                    setEditedDescription(item.taskname);
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
                {/* Apply the completed class if the task is marked as completed */}
                <span
                  className={`description ${item.completed ? "completed" : ""}`}
                >
                  {item.taskname}
                </span>
                <span className="task-date">
                  {new Date(item.date).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ListItem;
