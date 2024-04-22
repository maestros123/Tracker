import React, {useState, useCallback, memo} from 'react';
import 'moment/locale/ru';
import styles from './Calendar.module.scss';
import moment from "moment";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Month from "@/components/Elements/Calendar/Month/Month";

const Calendar:React.FC = memo(() => {
    const [currentMonth, setCurrentMonth] = useState(moment());

    const handlePrevMonth = useCallback(() => {
        setCurrentMonth(prev => prev.clone().subtract(1, 'month'));
    }, []);

    const handleCurrentMonth = useCallback(() => {
        setCurrentMonth(moment());
    }, []);

    const handleNextMonth = useCallback(() => {
        setCurrentMonth(prev => prev.clone().add(1, 'month'));
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.wrapper}>{currentMonth.format('MMMM')} <span>{currentMonth.format('YYYY')}</span></div>
                <div className={styles.navigation}>
                    <MdArrowBackIos onClick={handlePrevMonth} />
                    <button onClick={handleCurrentMonth}>Текущий</button>
                    <MdArrowForwardIos onClick={handleNextMonth} />
                </div>
            </div>
            <div className={styles.month}>
                <Month currentMonth={currentMonth} />
            </div>
        </div>
    );
});

Calendar.displayName = 'Calendar'

export default Calendar;
