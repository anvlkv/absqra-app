import { Base } from './base';
import { TaskExecutor } from './enums/task.enums';
export declare class Task extends Base {
    executor: TaskExecutor;
    code: string;
}
