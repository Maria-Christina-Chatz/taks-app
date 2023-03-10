import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { connected } from 'process';

interface Props {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({ todo, todos, setTodos }: Props) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    const handleDone = (id: Number) => {
        setTodos(todos.map((todo) =>
         todo.id === id ? {...todo, isDone: !todo.isDone} : todo)
        )
    };

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id ));
    }
    
    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
            todos.map((todo) => (
                todo.id === id ? {...todo, todo: editTodo} : todo )
            )
        );

        setEdit(false);
    }

    return (
        <form className='todos__single'
            // ref={provided.innerRef}
            onSubmit = {
                (e) => handleEdit(e, todo.id)}>
                    <span 
                        className="icon" 
                        onClick = { () => 
                            {  
                                handleDone(todo.id)
                            }
                        }>
                        <MdDone />
                    </span>
                {
                    edit ? (
                        <input 
                            value = { editTodo }
                            onChange = { (e) => setEditTodo(e.target.value)}
                            className="todos__single--text"
                            ref={inputRef}
                            /> 
                    ) : 
                    
                    todo.isDone ? (
                        <s className='todos__single--text'>
                            {todo.todo}
                        </s>
                    ) 
                    
                    : (
                        <span className='todos__single--text'>
                            {todo.todo}
                        </span>
                    ) 
                }
           
            <div className='icon-container'>
                <span 
                    className="icon" 
                    onClick = { () => 
                        { 
                            if(!edit &&!todo.isDone) {
                                setEdit(!edit)
                                console.log('!edit', !edit);
                                console.log('todo.isDone', !todo.isDone);
                            }
                        }
                    }                    
                >
                    <AiFillEdit />
                </span>
                <span 
                    className="icon delete-action" 
                    onClick = { () => 
                        { 
                            handleDelete(todo.id)
                        }
                    }>                    
                    <AiFillDelete />
                </span>
            </div>
        </form>
    )
};

export default SingleTodo;