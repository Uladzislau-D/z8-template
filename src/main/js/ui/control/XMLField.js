Z8.define('org.zenframework.z8.template.controls.xml', {
    extend: 'Z8.form.field.Text',
    
    tag: 'div',
    
    setValue: function(value, displayValue) {
        this.callParent(value, displayValue);
        if (this.selectNode("div.xml")) {
            hljs.highlightBlock(el);
        }
    },
    
    controlMarkup: function() {
        value = Format.htmlEncode(this.valueToRaw(this.getValue()));
        let input = { 
        		tag: this.getInputTag(), 
        		name: 'input',
        		contenteditable: true,         	
        		placeholder: this.placeholder, 
        		autocomplete: this.autocomplete, 
        		cls: "xml", 
        		tabIndex: this.getTabIndex(),
        		spellcheck: false, type: this.password ? 'password' : 'text', 
        		title: this.tooltip || '',
        		value: this.getInputTag() == 'input' ? value : null, 
        		html: this.getInputTag() != 'input' ? value : null 
        };
        this.addTriggers(this.triggers);
        return [input];
    },
    
    addTriggers: function(triggers){
    	if(!Z8.isEmpty(triggers)) {
            triggers = Array.isArray(triggers) ? triggers : [triggers];
            this.triggers = [];
            let counter = 0;
            triggers.forEach(function (trigger){
            	this.triggers.push(
                		new Z8.button.Trigger({
		                	primary: true,
		                	icon: trigger.icon, 
		                	handler: trigger.handler,
		                	scope: trigger.scope,
		                	tooltip: trigger.tooltip,
		                	cls: DOM.parseCls(trigger.cls).pushIf('trigger-' + counter++) 
		                })
                );
                result.push(trigger.htmlMarkup());
            });
        }
    }
});