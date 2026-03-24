// This is a scripted coppercube action.
// Compares two CopperScript variables.
//
/*
	<action jsname="action_CSCompareVars" description="CopperScript: Compare Two Variables">
		<property name="VarName1" type="string" default="value1" description="First variable" />
		<property name="VarName2" type="string" default="value2" description="Second variable" />
		<property name="Operator" type="string" default=">" description="Operator (>, <, ==, >=, <=, !=)" />
		<property name="TrueAction" type="action" description="Action if TRUE" />
		<property name="FalseAction" type="action" description="Action if FALSE" />
	</action>
*/

action_CSCompareVars = function() {
};

action_CSCompareVars.prototype.execute = function(currentNode) {
	var me = this;
	
	var val1 = parseFloat(window.csCore.vars[me.VarName1] || 0);
	var val2 = parseFloat(window.csCore.vars[me.VarName2] || 0);
	var res = false;
	
	switch(me.Operator) {
		case ">":  res = val1 > val2; break;
		case "<":  res = val1 < val2; break;
		case "==": res = val1 == val2; break;
		case ">=": res = val1 >= val2; break;
		case "<=": res = val1 <= val2; break;
		case "!=": res = val1 != val2; break;
	}
	
	window.csCore.log("Compare " + me.VarName1 + "(" + val1 + ") " + me.Operator + " " + me.VarName2 + "(" + val2 + ") = " + res);
	
	if (res && me.TrueAction) {
		ccbInvokeAction(me.TrueAction, currentNode);
	} else if (!res && me.FalseAction) {
		ccbInvokeAction(me.FalseAction, currentNode);
	}
};