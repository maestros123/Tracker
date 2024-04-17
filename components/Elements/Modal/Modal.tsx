import React, { ReactNode } from 'react';
import styles from './Modal.module.scss';
import {MdClose} from "react-icons/md";

// Определение интерфейса для пропсов компонента Modal
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <MdClose className={styles.closeButton} onClick={onClose}/>
                {children}
            </div>
        </div>
    );
};

export default Modal;
