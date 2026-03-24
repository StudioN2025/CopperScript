// This is a scripted coppercube action.
// Saves all CopperScript variables to local storage.
//
/*
	<action jsname="action_CSSaveGame" description="CopperScript: Save Game">
		<property name="CustomKey" type="string" default="cs_save_data" description="Save key" />
	</action>
*/

action_CSSaveGame = function() {
};

action_CSSaveGame.prototype.execute = function(currentNode) {
	var me = this;
	
	try {
		localStorage.setItem(me.CustomKey, JSON.stringify(window.csCore.vars));
		console.log("[CS]: Game saved to " + me.CustomKey);
	} catch(e) {
		console.error("[CS]: Failed to save game!");
	}
};