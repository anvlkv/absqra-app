import {Route} from '@angular/router';
import {ItemResponseFormComponent} from './item/item-response-form.component';
/**
 * Created by a.nvlkv on 19/11/2016.
 */

export const routes: Route[]=[
    {path:':taskId', component: ItemResponseFormComponent}
];