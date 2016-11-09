import { Session } from 'meteor/session'
import { FlowRouter } from 'meteor/kadira:flow-router';

rSig = function(){
	let sig = {
		response: Session.get(FlowRouter.getParam('survey')),
		fp: Session.get('fp'),
	};
	if (sig.fp) {
		return sig;	
	}
}