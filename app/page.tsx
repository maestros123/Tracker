"use client";

import styles from "./page.module.scss";
import Calendar from "@/components/Elements/Calendar/Calendar";
import Modal from "@/components/Elements/Modal/Modal";
import modalStore from "@/stores/ModalStores";
import Tasks from "@/features/tasks/components/Tasks/Tasks";
import React from "react";
import Sidebar from "@/components/Layouts/Sidebar/Sidebar";
import { observer } from "mobx-react-lite";

const Home = observer(() => {
    const taskData = modalStore.getModalData('taskModal'); // Получаем данные задачи

    return (
        <main>
            <div className={styles.container}>
                <Sidebar />
                <Calendar />
            </div>
            <Modal
                isOpen={modalStore.isModalOpen('taskModal')}
                onClose={() => modalStore.closeModal('taskModal')}
            >
                <Tasks initialState={taskData} /> {/* Передаем данные как пропс */}
            </Modal>
        </main>
    );
});

export default Home;
