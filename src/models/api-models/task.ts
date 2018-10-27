import { Base } from './base';
import { TaskExecutorType } from './enums/task.enums';
export declare class Task extends Base {
    executor: TaskExecutorType;
    content: string;
}
