import {MongoObservable} from "meteor-rxjs";
import {IItemResponse} from "../models/item-response.model";
/**
 * Created by a.nvlkv on 20/11/2016.
 */

export const ItemsResponses = new MongoObservable.Collection<IItemResponse>('items_responses');