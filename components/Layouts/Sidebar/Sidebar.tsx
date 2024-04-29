import React from 'react';
import styles from './Sidebar.module.scss'
import {MdCalendarMonth, MdCardGiftcard, MdMood, MdOutlineCalendarViewWeek, MdOutlineToday} from "react-icons/md";
import Link from "next/link";

const Sidebar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.group}>
                <h3 className={styles.title}>Задачи</h3>
                <Link href="/myday"><MdOutlineToday /> <span>Мой день</span></Link>
                <p><MdOutlineCalendarViewWeek /><span>Моя неделя</span></p>
                <Link href="/month"><MdCalendarMonth /><span>Мой месяц</span></Link>
            </div>

            <div className={styles.group}>
                {/*<h3 className={styles.title}>Настроение</h3>*/}
                <p><MdMood /> <span>Моё настроение</span></p>
            </div>
            <div className={styles.group}>
                {/*<h3 className={styles.title}>Лист желаний</h3>*/}
                <p><MdCardGiftcard /><span>Мои желания</span></p>
            </div>
        </div>
    );
};

export default Sidebar;