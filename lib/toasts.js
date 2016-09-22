activeToasts = new ReactiveDict();

singleToast =function (text, duration){
	duration = duration ? duration : 4000;
	if (!activeToasts.get(text)) {
		activeToasts.set(text, true);
		// console.log(typeof text );
		Materialize.toast(text, duration, '',function(){
			activeToasts.set(text, false);
		});
	}
}