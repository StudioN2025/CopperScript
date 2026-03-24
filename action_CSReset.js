// This is a scripted coppercube action.
// Resets all CopperScript variables.
//
/*
	<action jsname="action_CSReset" description="CopperScript: Reset All Variables">
		<property name="Confirm" type="bool" default="false" description="Confirm reset" />
	</action>
*/

action_CSReset = function() {
};

action_CSReset.prototype.execute = function(currentNode) {
	var me = this;
	
	if (!me.Confirm) {
		console.warn("[CS]: Reset skipped (not confirmed)");
		return;
	}
	
	window.csCore.vars = {};
	window.csTemp = {};
	
	try {
		localStorage.removeItem("cs_save_data");
		window.csCore.log("All variables reset");
	} catch(e) {}
};