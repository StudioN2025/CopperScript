// This is a scripted coppercube action.
// Gets a CopperScript variable value.
//
/*
	<action jsname="action_CSGetVar" description="CopperScript: Get Variable">
		<property name="VarName" type="string" default="myValue" description="Variable name" />
		<property name="UseResult" type="action" description="Action on success" />
		<property name="FallbackAction" type="action" description="Action if not found" />
		<property name="StoreInTemp" type="string" default="result" description="Temp storage key" />
	</action>
*/

action_CSGetVar = function() {
};

action_CSGetVar.prototype.execute = function(currentNode) {
	var me = this;
	
	var val = window.csCore.vars[me.VarName];
	
	if (val === undefined) {
		if (me.FallbackAction) {
			ccbInvokeAction(me.FallbackAction, currentNode);
		}
		return;
	}
	
	window.csTemp = {};
	window.csTemp.measVal = val;
	
	window.csCore.log("Var Get: " + me.VarName + " = " + val);
	
	if (me.UseResult) {
		setTimeout(function() { ccbInvokeAction(me.UseResult, currentNode); }, 100);
	}
};