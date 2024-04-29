import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import modalStore from "@/stores/ModalStores";
import styles from './Tasks.module.scss';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Button from "@/components/Elements/ui/Button/Button";
import SelectItem from "@/components/Elements/ui/SelectItem/SelectItem";
import {Task, taskStore} from "@/stores/TaskStores";
import {AddTask} from "@/features/tasks/AddTask";

interface OptionType {
    value: string;
    label: string;
}

export interface StateType {
    id: string;
    date: Date;
    showCalendar: boolean;
    selectedOptionCategory: OptionType;
    selectedOptionStatus: OptionType;
    options: {
        category: OptionType[];
        status: OptionType[];
    };
    taskTitle: string;
    taskDescription: string;
    taskTags: string;
}

interface Props {
    initialState?: Task | null;
}

const Tasks = observer(({ initialState }: Props) => {
    const initialDate: Date = modalStore.getModalDate('taskModal') || new Date();
    const [state, setState] = useState<StateType>({
        id : initialState?.id || '',
        date: initialDate,
        showCalendar: false,
        selectedOptionCategory: { value: initialState?.category || 'default', label: initialState?.category || 'Выбрать категорию' },
        selectedOptionStatus: { value: initialState?.status || 'default', label: initialState?.status || 'Статус задачи' },
        options: {
            category: [
                { value: 'Работа', label: 'Работа' },
                { value: 'Личное', label: 'Личное' },
            ],
            status: [
                { value: 'todo', label: 'Поставлена' },
                { value: 'inProgress', label: 'В работе' },
                { value: 'done', label: 'Выполнена' },
            ]
        },
        taskTitle: initialState?.title || '',
        taskDescription: initialState?.description || '',
        taskTags: initialState?.tags || ''
    });

    const handleDateChange = (newDate: Date) => {
        setState(prev => ({...prev, date: newDate, showCalendar: false}));
    };

    const handleInputChange = (field: keyof StateType, value: any) => { // по хорошему бы убрать any
        setState(prev => ({ ...prev, [field]: value }));
    };


    return (
        <div className={styles.container}>
            <input
                className={styles.title}
                type="text"
                placeholder="Заголовок задачи"
                value={state.taskTitle}
                onChange={(e) => handleInputChange('taskTitle', e.target.value)}
            />
            <div className={styles.group}>
                <div className={styles.key}>Категория</div>
                <div className={styles.value}>
                    <SelectItem
                        options={state.options.category}
                        selectedOption={state.selectedOptionCategory}
                        setSelectedOption={(option) => handleInputChange('selectedOptionCategory', option)}
                    />
                </div>
            </div>

            <div className={styles.group}>
                <div className={styles.key}>Дата</div>
                <div className={styles.value} onClick={() => setState(prev => ({ ...prev, showCalendar: !prev.showCalendar }))}>
                    {state.date ? state.date.toLocaleDateString() : 'Дата не установлена'}
                    {state.showCalendar && (
                        <Calendar className={styles.cal} onChange={handleDateChange} value={state.date} onClickDay={(value, event) => event.stopPropagation()} />
                    )}
                </div>
            </div>

            <div className={styles.group}>
                <div className={styles.key}>Описание</div>
                <div className={styles.value}>
                    <textarea
                        value={state.taskDescription}
                        onChange={(e) => handleInputChange('taskDescription', e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.group}>
                <div className={styles.key}>Теги</div>
                <div className={styles.value}>
                    <input
                        type="text"
                        placeholder="#теги через запятую"
                        value={state.taskTags}
                        onChange={(e) => handleInputChange('taskTags', e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.group}>
                <div className={styles.key}>Статус</div>
                <div className={styles.value}>
                    <SelectItem
                        options={state.options.status}
                        selectedOption={state.selectedOptionStatus}
                        setSelectedOption={(option) => handleInputChange('selectedOptionStatus', option)}
                    />
                </div>
            </div>

            <div className={styles.wrapper}>
                <Button onClick={() => AddTask(state)}>Сохранить</Button>
            </div>

        </div>
    );
});

export default Tasks;
