
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS (app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root@localhost/todolist'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Database model
class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    taskname = db.Column(db.String(120), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)

# Initialize the database
with app.app_context():
    db.create_all()

# POST method to add a new todo item
@app.route('/todos', methods=['POST'])
def add_todo():
    data = request.json
    print('Received data:', data)  # This will print to the server logs

    if not data or 'taskname' not in data or not data['taskname'].strip():
        return jsonify({"error": "Task name is required and cannot be empty."}), 400

    new_todo = Todo(taskname=data['taskname'])

    try:
        db.session.add(new_todo)
        db.session.commit()
        return jsonify({
            "id": new_todo.id,
            "taskname": new_todo.taskname,
            "date": new_todo.date.strftime('%Y-%m-%d %H:%M:%S')
        }), 201
    except Exception as e:
        db.session.rollback()
        print(f"Error: {e}")  # Log the error
        return jsonify({"error": "Failed to add todo item.", "message": str(e)}), 500

# GET method to retrieve todos
@app.route('/todos', methods=['GET'])
def get_todos():
    todos = Todo.query.all()
    return jsonify([{
        "id": todo.id,
        "taskname": todo.taskname,
        "date": todo.date.strftime('%Y-%m-%d %H:%M:%S')
    } for todo in todos])

# PUT method to update a todo item
@app.route('/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    # Get the todo item by id
    todo = Todo.query.get_or_404(todo_id)
    
    # Get the updated task name from the request
    data = request.json
    
    # Validate the updated task name
    if not data or 'taskname' not in data or not data['taskname'].strip():
        return jsonify({"error": "Task name is required and cannot be empty."}), 400

    # Update the taskname
    todo.taskname = data['taskname']
    
    try:
        db.session.commit()
        return jsonify({
            "id": todo.id,
            "taskname": todo.taskname,
            "date": todo.date.strftime('%Y-%m-%d %H:%M:%S')
        })
    except Exception as e:
        db.session.rollback()
        print(f"Error: {e}")  # Log the error
        return jsonify({"error": "Failed to update todo item.", "message": str(e)}), 500

# DELETE method to delete a todo item
@app.route('/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    # Get the todo item by id
    todo = Todo.query.get_or_404(todo_id)
    
    try:
        db.session.delete(todo)
        db.session.commit()
        return jsonify({"message": "Todo item deleted successfully."}), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error: {e}")  # Log the error
        return jsonify({"error": "Failed to delete todo item.", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
