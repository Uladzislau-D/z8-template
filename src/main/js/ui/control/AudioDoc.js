Z8.define('org.zenframework.z8.template.controls.Doc', {
    extend: 'Z8.form.field.File',

	htmlMarkup: function() {
		let markup = this.callParent();
		markup.cn.add({
			tag: 'audio',
			controls: 'controls',
		});		
		return markup;
	},
	
	completeRender: function() {
		this.callParent();		
		DOM.addCls(this.audio = this.selectNode('audio'), 'display-none');
	},
	
	setValue: function (value, displayValue)  {
		this.callParent(value, displayValue);
		if(this.audio) {
			if(value && this.getValue()[0]) {
				this.url = value;
				let info = this.getValue()[0];
				let src = `${info.path}?&id=${info.id}&session=${Application.session}`;
				this.audio.src = src;
				DOM.removeCls(this.audio, 'display-none');
			} else {
				DOM.addCls(this.audio, 'display-none');
			}
		}		
	}
	
});
