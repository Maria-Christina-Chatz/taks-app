import React, { useState } from 'react';
import './App.css';
import '../src/components/styles.scss';
import InputField from './components/InputField'; 
import TodoList from './components/TodoList';
import { Todo } from './model';


const App: React.FC = () =>  {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = ( e: React.FormEvent ) => {
    e.preventDefault();
    if(todo) {
      setTodos(
        [...todos, 
          { id: Date.now(), 
            todo, 
            isDone: false}
        ]
      )
    }

    setTodo("");    
  };

  return (    
    <div className="App">
      <div className='container app-template'>
        <span className='heading'>todos</span>
        <InputField 
          todo = { todo } 
          setTodo = { setTodo } 
          handleAdd = { handleAdd } />
        <TodoList 
          todos = { todos } 
          setTodos = { setTodos } />    
      </div>
    </div>
  );
}

export default App;
