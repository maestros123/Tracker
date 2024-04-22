import { makeAutoObservable } from "mobx";
import moment, {Moment} from "moment";

export interface Task {
    id: string;
    title: string;
    date: Date;
    description: string;
    category: string;
    tags: string;
    status: string;
}

class TaskStore {
    tasks: Task[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addTask(data: Task) {
        const newTask: Task = {
            id: data.id,
            title: data.title,
            description: data.description,
            date: data.date,
            category: data.category,
            status: data.status,
            tags: data.tags
        };
        this.tasks.push(newTask);
    }

    updateTask(taskId: string, data: Task) {
        const index = this.tasks.findIndex(task => task.id === taskId);
        if (index !== -1) {
            this.tasks[index] = {...this.tasks[index], ...data};
        }
    }

    getTasksByDate(date: Moment): Task[] {
        return this.tasks.filter(el => moment.utc(el.date).isSame(moment.utc(date), 'day'));
    }

    // moveTask(id: string, newStatus: Task["status"]) {
    //     const task = this.tasks.find(task => task.id === id);
    //     if (task) {
    //         task.status = newStatus;
    //     }
    // }

    delTask(id: string) {
        this.tasks = this.tasks.filter((el) => el.id !== id)

    }
}

export const taskStore = new TaskStore();
