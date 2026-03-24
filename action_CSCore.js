// This is a scripted coppercube action.
// Initializes the CopperScript global system.
//
/*
	<action jsname="action_CSCore" description="CopperScript: Init Core">
		<property name="ClearVars" type="bool" default="false" description="Clear all variables" />
	</action>
*/

action_CSCore = function() {
};

action_CSCore.prototype.execute = function(currentNode) {
	var me = this; 
	
	window.csCore = window.csCore || {};
	
	if (me.ClearVars) {
		window.csCore.vars = {};
	}
	
	if (!window.csCore.init) {
		window.csCore.vars = {};
		window.csCore.log = function(msg) { console.log("[CS]: " + msg); };
		window.csCore.init = true;
	}
	
	if (me.ClearVars && localStorage.getItem("cs_save_data")) {
		localStorage.removeItem("cs_save_data");
		localStorage.clear();
		window.csCore.log("Data cleared");
	} else if (localStorage.getItem("cs_save_data")) {
		try {
			let saved = JSON.parse(localStorage.getItem("cs_save_data"));
			Object.assign(window.csCore.vars, saved);
			window.csCore.log("Data loaded");
		} catch(e) {}
	}
};