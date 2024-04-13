import React from 'react';
import { observer } from 'mobx-react-lite';
import modalStore from "@/stores/ModalStores";

const AddTask = observer(() => {
    const modalDate = modalStore.getModalDate('taskModal');

    return (
        <div>
            {modalDate ? (
                <p>Дата задачи: {modalDate.toString()}</p> // Отображаем дату
            ) : (
                <p>Дата не установлена</p>
            )}
        </div>
    );
});

export default AddTask;
