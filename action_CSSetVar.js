// This is a scripted coppercube action.
// Sets a CopperScript variable value.
//
/*
	<action jsname="action_CSSetVar" description="CopperScript: Set Variable">
		<property name="VarName" type="string" default="myValue" description="Variable name" />
		<property name="StringValue" type="string" default="text" description="String value" />
		<property name="FloatValue" type="float" default="0" description="Float value" />
		<property name="IntValue" type="int" default="0" description="Integer value" />
		<property name="BoolValue" type="bool" default="true" description="Boolean value" />
	</action>
*/

action_CSSetVar = function() {
};

action_CSSetVar.prototype.execute = function(currentNode) {
	var me = this;
	
	var val;
	
	if (me.IntValue !== undefined) val = me.IntValue;
	else if (me.FloatValue !== undefined) val = me.FloatValue;
	else if (me.BoolValue !== undefined) val = me.BoolValue;
	else if (me.StringValue !== undefined) val = me.StringValue;
	else val = "";
	
	window.csCore.vars[me.VarName] = val;
	window.csCore.log("Var Set: " + me.VarName + " = " + val);
	
	try {
		localStorage.setItem("cs_save_data", JSON.stringify(window.csCore.vars));
	} catch(e) {}
};