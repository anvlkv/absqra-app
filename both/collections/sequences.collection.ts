import {ISequence} from "../models/single-sequence.model";
import {MongoObservable} from "meteor-rxjs";
/**
 * Created by a.nvlkv on 27/12/2016.
 */

export const Sequences = new MongoObservable.Collection<ISequence>('sequences');