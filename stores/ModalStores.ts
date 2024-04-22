import { makeAutoObservable } from 'mobx';
import {Task} from "@/stores/TaskStores";

// Определяем интерфейс для индивидуального модального окна
interface IModal {
    isOpen: boolean;
    data: Task | null;
}

// Определяем интерфейс для хранения состояний всех модальных окон
interface IModals {
    [key: string]: IModal; // Индексированный тип для динамического доступа к модальным окнам
}

class ModalStore {
    // Состояние для хранения открытости модальных окон
    modals: IModals = {
        taskModal: {
            isOpen: false,
            data: null,
        },
    };

    constructor() {
        makeAutoObservable(this);
    }

    // Функция для открытия модального окна
    openModal(id: string, data?: Partial<Task>): void {
        const modal = this.modals[id];
        if (modal) {
            modal.isOpen = true;
            if (data) {
                // Обновляем данные в модальном окне, если они есть
                if (!modal.data) {
                    modal.data = {} as Task; // Создаем пустой объект Task, если он еще не был инициализирован
                }
                // Применяем предоставленные данные к существующему объекту Task
                Object.assign(modal.data, data);
            } else {
                // Если data не предоставлены, очищаем данные в модальном окне
                modal.data = null;
            }
        }
    }

    // Функция для закрытия модального окна
    closeModal(id: string): void {
        if (this.modals[id]) {
            this.modals[id].isOpen = false;
            this.modals[id].data = null;
        }
    }

    // Функция для проверки, открыто ли модальное окно
    isModalOpen(id: string): boolean {
        return !!this.modals[id]?.isOpen;
    }

    // Функция для получения даты, связанной с модальным окном
    getModalDate(id: string): Date | null {
        return this.modals[id]?.data?.date || null;
    }

    getModalData(id: string) {
        return this.modals[id]?.data ;
    }

}

const modalStore = new ModalStore();
export default modalStore;
