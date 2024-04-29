"use client"

import React from 'react';
import Calendar from "@/components/Elements/Calendar/Calendar";
import Modal from "@/components/Elements/Modal/Modal";
import modalStore from "@/stores/ModalStores";
import {observer} from "mobx-react-lite";
import Tasks from "@/features/tasks/components/Tasks/Tasks";
import {taskStore} from "@/stores/TaskStores";

const Tasks = observer(() => {
    return (
        <div>
            <Calendar/>
            <Modal
                isOpen={modalStore.isModalOpen('taskModal')}
                onClose={() => modalStore.closeModal('taskModal')}
            >
                <Tasks/>
            </Modal>
        </div>
    );
});

export default Tasks;