import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styles from './Day.module.scss'
import moment, {Moment} from 'moment';
import {MdAdd} from "react-icons/md";
import modalStore from "@/stores/ModalStores";
import {Task, taskStore} from "@/stores/TaskStores";
import {reaction} from "mobx";
import {EditTask} from "@/features/tasks/EditTask";


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
            () => taskStore.tasks.filter(task => moment(task.date).isSame(date, 'day')),
            fetchedTasks => setTasks(fetchedTasks),
            { fireImmediately: true }
        );

        return () => disposer();
    }, [date]);


    return (
        <div className={containerClasses}>
            <div className={styles.navigation}>
                <MdAdd className={styles.add} onClick={() => handleClick()}/>
                <div className={styles.number}>{children}</div>
            </div>
            {tasks && tasks.map(item => (
                <div className={styles.task} key={item.id} onClick={() => EditTask(item)}>{item.title}</div>
            ))}
        </div>
    );
});

export default Day;