// This is a scripted coppercube action.
// Loads all CopperScript variables from local storage.
//
/*
	<action jsname="action_CSLoadGame" description="CopperScript: Load Game">
		<property name="CustomKey" type="string" default="cs_save_data" description="Save key" />
	</action>
*/

action_CSLoadGame = function() {
};

action_CSLoadGame.prototype.execute = function(currentNode) {
	var me = this;
	
	try {
		let saved = JSON.parse(localStorage.getItem(me.CustomKey));
		if(saved) {
			Object.assign(window.csCore.vars, saved);
			console.log("[CS]: Game loaded from " + me.CustomKey);
		}
	} catch(e) {
		console.error("[CS]: Failed to load game!");
	}
};