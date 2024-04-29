import {taskStore} from "@/stores/TaskStores";
import modalStore from "@/stores/ModalStores";
import {StateType} from "@/features/tasks/components/Tasks/Tasks";

export const AddTask = (task: StateType) => {

    const taskData  = {
        title: task.taskTitle,
        description: task.taskDescription,
        date: task.date,
        category: task.selectedOptionCategory.value,
        status: task.selectedOptionStatus.value,
        tags: task.taskTags
    };

    if (task.id) {
        // Обновляем существующую задачу
        taskStore.updateTask(task.id, {...taskData, id: task.id});
    } else {
        // Создаем новую задачу
        const newTask = {...taskData, id: Math.random().toString(36).substring(2, 9)};
        taskStore.addTask(newTask);
    }

    modalStore.closeModal('taskModal');
}
