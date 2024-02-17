import styles from './App.module.css'
import './global.css'

import {PlusCircle} from 'phosphor-react'
import { Header } from './components/Header';
import { ListHeader } from './components/ListHeader';
import { Input } from './components/Input';
import { Button } from './components/Button';
import { ChangeEvent, useState } from 'react';
import { Item } from './components/Item';
import { Empty } from './components/Empty';

interface taskProps {
  id: number
  text: string
  isChecked: boolean
}

function App() {
  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState<taskProps[]>([]);

  const checkedTasksCounter = tasks.reduce((prevValue, currentTask) => {
    if(currentTask.isChecked) {
      return prevValue + 1;
    }
    return prevValue
  }, 0)

  function handleTakeTask(e:ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleAddNewTask() {
    if(!inputValue) {
      return;
    }
    
    const newTask: taskProps = {
      id: new Date().getTime(),
      text: inputValue,
      isChecked: false,
    } 

    setTasks((state) => [...state, newTask]);
    setInputValue('');
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter((task) => task.id !== id)

    if(!confirm('Deseja mesmo apagar essa tarefa?')) {
      return
    }

    setTasks(filteredTasks)
  }

  function handleToggleTask({ id, value }: { id: number; value: boolean }) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isChecked: value }
      }

      return { ...task }
    })

    setTasks(updatedTasks)
  }

  return (
  <main>
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.InputBtnCreate}>
          <Input 
            onChange={handleTakeTask} 
            value={inputValue}/>
          <Button onClick={handleAddNewTask}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight='bold'/>
          </Button>
      </div>
      <div className={styles.listContainer}>
        <div className={styles.container}>
        <ListHeader 
        tasksCounter={tasks.length}
        checkedTasksCounter={checkedTasksCounter}
        />
      {tasks.length > 0 ? (
        <div>
          {tasks.map((task) => (
            <Item 
              key={task.id}
              data={task}
              removeTask={handleRemoveTask}
              toggleTasksStatus={handleToggleTask}
            />
          ))}
        </div>
      ) : (
        <Empty />
      )}
      </div>
      </div>
    </div>
  </main>
  );
}
export default App
