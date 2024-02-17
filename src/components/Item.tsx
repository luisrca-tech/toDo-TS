import { Check, Trash } from 'phosphor-react';
import styles from './Item.module.css'

interface taskProps {
  id: number
  text: string
  isChecked: boolean
}

interface Props {
  data: taskProps
  removeTask: (id: number) => void;
  toggleTasksStatus: ({id, value}: {id: number, value: boolean} ) => void
}

export function Item({data, removeTask, toggleTasksStatus}:Props) {
  function handleTaskToggle() {
    toggleTasksStatus({id: data.id, value: !data.isChecked})
  }

  function handleRemove() {
    removeTask(data.id)
  }

  const checkboxCheckedClassname = data.isChecked
  ? styles['checkbox-checked']
  : styles['checkbox-unchecked']

  const paragraphCheckedClassname = data.isChecked
  ? styles['paragraph-checked']
  : ''

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="checkbox" onClick={handleTaskToggle}>
          <input readOnly type="checkbox" checked={data.isChecked} />
          <span className={`${styles.checkbox} ${checkboxCheckedClassname}`}>
              {data.isChecked && <Check size={12}/>}
          </span>
          <p className={`${styles.paragraph} ${paragraphCheckedClassname}`}>
            {data.text}
          </p>
        </label>
      </div>

      <button >
        <Trash onClick={handleRemove} size={16} color="#808080" />
      </button>
    </div>
  )
}