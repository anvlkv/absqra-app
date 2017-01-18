import {MongoObservable} from "meteor-rxjs";
import {ISingleItem} from "../models/single-item.model";
/**
 * Created by a.nvlkv on 19/11/2016.
 */

export const Items = new MongoObservable.Collection<ISingleItem>('items');