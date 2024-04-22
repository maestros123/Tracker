import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styles from './Day.module.scss'
import moment, {Moment} from 'moment';
import {MdAdd} from "react-icons/md";
import modalStore from "@/stores/ModalStores";
import {Task, taskStore} from "@/stores/TaskStores";
import {reaction} from "mobx";


interface DayProps {
    children: React.ReactNode,
    date: Moment,
    isCurrentMonth: boolean;
}

const Day: React.FC<DayProps> = (({children, date, isCurrentMonth}) => {

    const handleClick = useCallback(() => {
        const momentDate = date.toDate();
        const data: Partial<Task> = { date: momentDate };
        modalStore.openModal('taskModal', data);
    }, [date]);

    // Функция для проверки, является ли переданная дата сегодняшним днем
    const isToday = (date: Moment) => {
        return moment().isSame(date, 'day');
    };

    const containerClasses = useMemo(() => {
        return `${styles.container} ${isToday(date) ? styles.active : ''} ${!isCurrentMonth ? styles.notCurrentMonth : ''}`;
    }, [date, isCurrentMonth]);

    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const disposer = reaction(
            () => {
                // Собираем информацию не только о количестве задач, но и о их заголовках
                const tasksForDay = taskStore.tasks.filter(task => moment(task.date).isSame(date, 'day'));
                return {
                    count: tasksForDay.length,
                    titles: tasksForDay.map(task => task.title).join(',')
                };
            },
            (result) => {
                const loadTasks = async () => {
                    const fetchedTasks = await taskStore.getTasksByDate(date);
                    setTasks(fetchedTasks);
                };
                loadTasks();
            }
        );

        return () => {
            disposer();
        };
    }, [date])


    function handleClickTask(item: Task) {
        const data: Partial<Task> = {id:item.id, title: item.title, category: item.category, date: item.date };
        modalStore.openModal('taskModal', data);
    }

    return (
        <div className={containerClasses}>
            <div className={styles.navigation}>
                <MdAdd className={styles.add} onClick={() => handleClick()}/>
                <div className={styles.number}>{children}</div>
            </div>
            {tasks && tasks.map(item => (
                <div className={styles.task} key={item.id} onClick={() => handleClickTask(item)}>{item.title}</div>
            ))}
        </div>
    );
});

export default Day;