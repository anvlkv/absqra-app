import {ISequenceResponse} from "../models/sequence-response.model";
import {MongoObservable} from "meteor-rxjs";
/**
 * Created by a.nvlkv on 27/12/2016.
 */
export const SequencesResponses = new MongoObservable.Collection<ISequenceResponse>('sequences_responses');