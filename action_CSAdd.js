// This is a scripted coppercube action.
// Adds or subtracts a value from a CopperScript variable.
//
/*
	<action jsname="action_CSAdd" description="CopperScript: Add to Variable">
		<property name="VarName" type="string" default="gold" description="Variable name" />
		<property name="Value" type="int" default="10" description="Value" />
		<property name="Subtract" type="bool" default="false" description="Subtract instead of add" />
	</action>
*/

action_CSAdd = function() {
};

action_CSAdd.prototype.execute = function(currentNode) {
	var me = this;
	
	if (!window.csCore) {
		console.error("[CS]: Core not initialized!");
		return;
	}
	
	var current = window.csCore.vars[me.VarName] || 0;
	
	if (me.Subtract) {
		current -= me.Value;
	} else {
		current += me.Value;
	}
	
	window.csCore.vars[me.VarName] = current;
	window.csCore.log("Var " + me.VarName + " = " + current);
	
	try {
		localStorage.setItem("cs_save_data", JSON.stringify(window.csCore.vars));
	} catch(e) {}
};