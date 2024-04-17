import React, {useEffect, useState} from 'react';
import styles from './Day.module.scss'
import moment, {Moment} from 'moment';
import { MdAdd } from "react-icons/md";
import {observer} from "mobx-react-lite";
import modalStore from "@/stores/ModalStores";
import {Task, taskStore} from "@/stores/TaskStores";


interface DayProps {
    children: React.ReactNode,
    date: Moment,
    isCurrentMonth: boolean;
}

const Day:React.FC<DayProps> = observer(({children, date, isCurrentMonth}) => {
    const openModal = (id: string, date: Date) => modalStore.openModal(id, date);


    function handleClick(date: Moment) {
        const d = date.toDate();
        openModal('taskModal', d);
    }

    // Функция для проверки, является ли переданная дата сегодняшним днем
    const isToday = (date: Moment) => {
        return moment().isSame(date, 'day');
    };

    const containerClasses = `${styles.container} ${isToday(date) ? styles.active : ''} ${!isCurrentMonth ? styles.notCurrentMonth : ''}`;


    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const loadTasks = async () => {
            const fetchedTasks = await taskStore.getTasksByDate(date);
            setTasks(fetchedTasks);
        };
        loadTasks();
    }, [date]);


    return (
        <div className={containerClasses} >
            <div className={styles.navigation}>
                <MdAdd className={styles.add} onClick={() => handleClick(date)}/>
                {children}
            </div>
            {tasks && tasks.map(item => (
                <div className={styles.task} key={item.id}>{item.title}</div>
            ))}
        </div>
    );
});

export default Day;