// import './Components/Connexion/Connexion.css'
import './App.css'
import TodoApp from './Components/Application/ToDo';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
       <Toaster position="top-right" /> {/* This renders toasts in the top-right corner */}
      <TodoApp></TodoApp>
    </div>
  );
}

export default App;
