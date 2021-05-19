import { useState, useEffect } from 'react';
const data = require('./data')

// getting date
function getToday() {
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }
  today = dd + '/' + mm + '/' + yyyy;
  return today;
}

function App() {

	const [todos, setTodos] = useState([])
	const [todo, setTodo] = useState('')
	const [errorMessage, setErrorMessage] = useState(null)

	useEffect(() => {
		setTodos(data.data)
	},[])

	const handleTodoChange = (e) => {
		setTodo(e.target.value)
	}

	const addItem = (e) => {
		if(todo.trim() === '') {
			setErrorMessage('Cant add empty item...!')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		} else {	
			setTodos([...todos, {id:Date.now(), text: todo, isCompleted: false, isTrashed: false, date: getToday()}])
			setTodo('')
		}
	}

	const trashItem = (id) => {
		setTodos(todos.filter(item => {
					if(item.id === id) {
						return item.isTrashed = true
					}
					return item
				}))
	}

	const toggleTask = (id) => {
		setTodos(todos.filter(item => {
					if(item.id === id) {
						item.isCompleted = !item.isCompleted
					}
					return item
				}))
		// setTodos([...todos])
	}

	const unTrash = (id) => {
		 setTodos(todos.filter(item => {
		 		 	if(item.id === id) {
		 		 		item.isTrashed = false
		 		 	}
		 		 	return item
		 		 }))
		 // setTodos([...todos])
	}

	const permDel = (id) => {
		const filteredArr = todos.filter(item => {
			return item.id !== id
		})
		setTodos([...filteredArr])
	}

	// console.log("to dos",todos)

  return (
    <div className="min-h-screen dark:bg-gray-800 text-white">
      <div className="container mx-auto">
      	<div className="py-5 text-2xl text-center font-bold">
      		<h1>To Do App</h1>
      	</div>
      	<div className="text-center my-3">
      		<input value={todo} onChange={handleTodoChange} className="w-2/4 mx-3 p-2 text-black focus:outline-none" placeholder="Add an Item" type="text" />
      		<button onClick={addItem} className="mx-2 rounded bg-blue-700 focus:outline-none hover:bg-blue-600 px-5 py-2">ADD</button>
      		<div>
      			{
      				errorMessage && <small className="text-red-500 font-bold text-md">{errorMessage}</small>
      			}
      		</div>
      	</div>
      	<div className="grid grid-cols-3 gap-3">
      		{/*pending items start*/}	
	      		<div>
	      			<div className="text-lg font-bold">Pending Items</div>
	      			{
	      				todos.length > 0
	      				?
	      				todos.map(item => {
	      					if (!item.isCompleted && !item.isTrashed) {
		      					return (
					      			<div key={item.id} className="bg-gray-900 rounded p-3 m-2">
					      				<div className="flex items-center justify-between">
					      					<div>
							      				<input onChange={() => toggleTask(item.id)} className="mx-2" id="item" type="checkbox" />
							      				<label className="mx-2" htmlFor="item">{item.text}</label>
					      					</div>
						      				<img onClick={() => {trashItem(item.id)}} className="cursor-pointer" src="./trash.svg" alt="trash" />
					      				</div>
					      				<small>Created : {item.date}</small>
					      			</div>
		      					)
	      					}
	      					return null
	      				})
		      			: <div>Wohaaa nothing to do....</div>
	      			}
	      		</div>
      		{/*pending items end*/}

      	{/* completed items start */}
	      	<div>
	   			<div className="text-lg font-bold">Completed Items</div>
	   			{
	   				todos.length > 0 
	   				?
	   					todos.map(item => {
	   						if(item.isCompleted && !item.isTrashed) {	
		   						return(
						   			<div key={item.id} className="bg-gray-900 rounded p-3 m-2">
						   				<div className="flex items-center justify-between">
						      				<div>
							      				<input onChange={() => toggleTask(item.id)} checked className="mx-2" id="item" type="checkbox" />
							      				<label className="mx-2 line-through" htmlFor="item">{item.text}</label>
					      					</div>
						      				<img onClick={() => trashItem(item.id)} className="cursor-pointer" src="./trash.svg" alt="trash" />
						   				</div>
						   				<small>Created : {item.date}</small>
						   			</div>
		   						)
	   						}
	   						return null
	   					})
	   				: <div>Nothing here...!</div>
	   			}
	   		</div>
	      	{/*completed items end*/}

	      	{/*trash starts*/}
	      	<div>
	   			<div className="text-lg font-bold">Trash</div>
	   			{	
	   				todos.length > 0 
	   				?
	   					todos.map(item => {
	   						if(item.isTrashed) {
	   							return(
						   			<div key={item.id} className="bg-gray-900 rounded p-3 m-2">
						   				<div className="flex items-center justify-between">
						      				<div>
							      				<input onChange={() => unTrash(item.id)} checked className="mx-2" id="item" type="checkbox" />
							      				<label className={`mx-2 ${ !item.isCompleted ? '' : 'line-through'}`} htmlFor="item">{item.text}</label>
					      					</div>
						      				<img onClick={() => permDel(item.id)} className="cursor-pointer" src="./close.svg" alt="trash" />
						   				</div>
						   				<small>Created : {item.date}</small>
						   			</div>
	   							)
	   						}
	   						return null
	   					})
	   				: <div>Trash is empty...</div>
	   			}
	   		</div>
	      {/*trash ends*/}
      	</div>
      </div>
    </div>
  );
}

export default App;
