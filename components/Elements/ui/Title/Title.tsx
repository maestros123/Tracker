import React from 'react';
import styles from './Title.module.scss'

interface TitleProps {
    children: React.ReactNode
}

const Title:React.FC<TitleProps> = ({children}) => {
    return (
        <h2 className={styles.container}>
            {children}
        </h2>
    );
};

export default Title;