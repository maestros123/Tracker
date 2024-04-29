import {Task} from "@/stores/TaskStores";
import modalStore from "@/stores/ModalStores";

export const EditTask = (item: Task) =>  {
    const data: Partial<Task> = {id:item.id, title: item.title, category: item.category, date: item.date, description: item.description };
    modalStore.openModal('taskModal', data);
}