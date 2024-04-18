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
    const openModal = (id: string, date: Date) => modalStore.openModal(id, date);
    const handleClick = useCallback(() => {
        const d = date.toDate();
        openModal('taskModal', d);
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
            () => taskStore.tasks.filter(task => moment(task.date).isSame(date, 'day')).length,
            // Решение выше реагирует только на изменения текущего дня и уменьшает рендеры
            (tasksLength) => {
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


    function handleClickTask(id: string) {
        console.log(id)
    }

    return (
        <div className={containerClasses}>
            <div className={styles.navigation}>
                <MdAdd className={styles.add} onClick={() => handleClick()}/>
                {children}
            </div>
            {tasks && tasks.map(item => (
                <div className={styles.task} key={item.id} onClick={() => handleClickTask(item.id)}>{item.title}</div>
            ))}
        </div>
    );
});

export default Day;