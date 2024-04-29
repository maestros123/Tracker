import React, {useState} from 'react';
import styles from './MyDay.module.scss';
import Title from "@/components/Elements/ui/Title/Title";
import moment from "moment";
import 'moment/locale/ru';
import {Task, taskStore} from "@/stores/TaskStores";
import {AddTask} from "@/features/tasks/AddTask";
import {EditTask} from "@/features/tasks/EditTask";
import {FaPlus} from "react-icons/fa";
import {observer} from "mobx-react-lite";

const MyDay = observer(() => {
    const today = moment();
    const [taskTitle, setTaskTitle] = useState(''); // Состояние для заголовка задачи

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && taskTitle.trim()) {
            const taskData = {
                taskTitle: taskTitle,
                taskDescription: "",
                date: today.toDate(),
                selectedOptionCategory: {value: ""},
                selectedOptionStatus: {value: ""},
                taskTags: ""
            };
            AddTask(taskData);
            setTaskTitle('');
        }
    };

    function handleEditDate(event: React.MouseEvent<SVGElement>, task: Task) {
        event.stopPropagation();  // Останавливаем всплывание события

        // Создаём новую задачу с обновлённой датой
        AddTask({
            id: task.id,
            taskTitle: task.title,
            taskDescription: task.description,
            date: today.toDate(),
            selectedOptionCategory: {value: task.category || ""},
            selectedOptionStatus: {value: task.status || ""},
            taskTags: task.tags || ""
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <Title>{moment().format('D MMMM')} <span>{moment().format('YYYY')}</span></Title>
                <div className={styles.wrapper}>
                    <div className={styles.tasks}>
                        <div>
                            {taskStore.tasks.filter(task => moment(task.date).isSame(today, 'day')).map(task => (
                                <div className={styles.task} key={task.id} onClick={() => EditTask(task)}>
                                    <div className={styles.info}>
                                        <div className={styles.title}>{task.title}</div>
                                        <div className={styles.description}>{task.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Добавить задачу"
                            value={taskTitle}
                            onChange={e => setTaskTitle(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                    </div>
                    <div className={styles.group}>
                        <div className={styles.overdue}>
                            <h3>Просроченные задачи</h3>
                            {taskStore.tasks.filter(task => moment(task.date).isBefore(today, 'day')).map(task => (
                                <div className={styles.task} key={task.id} onClick={() => EditTask(task)}>
                                    <FaPlus onClick={(event) => handleEditDate(event, task)}/>
                                    <div className={styles.info}>
                                        <div className={styles.title}>{task.title}</div>
                                        <div className={styles.date}>{moment(task.date).format('D MMMM YYYY')}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.mood}>
                            <h3>Настроение</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default MyDay;
