"use client"

import React, { useState } from 'react';
import 'moment/locale/ru';
import styles from './Calendar.module.scss'
import Week from "@/components/Elements/Calendar/Week/Week";
import moment from "moment/moment";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";


const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(moment());

    return (
        <div>
            <div className={styles.title}>
                <div className={styles.container}>{currentMonth.format('MMMM')} <span>{currentMonth.format('YYYY')}</span></div>
                <div className={styles.navigation}>
                    <MdArrowBackIos onClick={() => setCurrentMonth(prev => prev.clone().subtract(1, 'month'))}/>
                    <button onClick={() => setCurrentMonth(moment())}>Текущий</button>
                    <MdArrowForwardIos onClick={() => setCurrentMonth(prev => prev.clone().add(1, 'month'))}/>

                </div>
            </div>
            <div className={styles.month}>
                <Week currentMonth={currentMonth}/>
            </div>
        </div>
    );
};

export default Calendar;