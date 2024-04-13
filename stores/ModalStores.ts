import { makeAutoObservable } from 'mobx';

// Определяем интерфейс для индивидуального модального окна
interface IModal {
    isOpen: boolean;
    date: Date | null;
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
            date: null,
        },
    };

    constructor() {
        makeAutoObservable(this);
    }

    // Функция для открытия модального окна
    openModal(id: string, date: Date): void {
        if (this.modals[id]) {
            this.modals[id].isOpen = true;
            this.modals[id].date = date;
        }
    }

    // Функция для закрытия модального окна
    closeModal(id: string): void {
        if (this.modals[id]) {
            this.modals[id].isOpen = false;
            this.modals[id].date = null;
        }
    }

    // Функция для проверки, открыто ли модальное окно
    isModalOpen(id: string): boolean {
        return !!this.modals[id]?.isOpen;
    }

    // Функция для получения даты, связанной с модальным окном
    getModalDate(id: string): Date | null {
        return this.modals[id]?.date || null;
    }
}

const modalStore = new ModalStore();
export default modalStore;
