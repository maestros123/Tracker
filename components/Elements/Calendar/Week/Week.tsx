import React from 'react';
import Day from "@/components/Elements/Calendar/Day/Day";
import styles from './Week.module.scss'
import {Moment} from "moment";


interface WeekProps {
    currentMonth: Moment;
}

const Week:React.FC<WeekProps> = ({ currentMonth }) => {
    // Названия дней недели
    const weekDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

    // Получаем начало и конец месяца
    const startWeek = currentMonth.clone().startOf('month').week();
    const endWeek = currentMonth.clone().endOf('month').week();

    let calendar = [];

    calendar.push(
        <div className={styles.container} key="weekDaysHeader">
            {weekDays.map(day => (
                <div className={styles.weekDay} key={`currentMonth-${day}`}>
                    {day}
                </div>
            ))}
        </div>
    );

    for (let week = startWeek; week <= endWeek; week++) {
        calendar.push(
            <div className={styles.container} key={week}>
                {Array(7).fill(0).map((n, i) => {
                    let day = currentMonth.clone().week(week).startOf('week').add(n + i, 'day');
                    return <Day date={day} isCurrentMonth={day.month() === currentMonth.month()} key={`${week}-${i}`}>{day.format('D')}</Day>;
                })}
            </div>
        );
    }

    return (
        <div>
            {calendar}
        </div>
    );
};

export default Week;
