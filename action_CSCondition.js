// This is a scripted coppercube action.
// Checks a condition and executes TrueAction or FalseAction.
//
/*
	<action jsname="action_CSCondition" description="CopperScript: Check Condition">
		<property name="VarName" type="string" default="value" description="Variable name" />
		<property name="Operator" type="string" default=">" description="Operator (>, <, ==, >=, <=, !=)" />
		<property name="CompareValue" type="float" default="0" description="Compare value" />
		<property name="TrueAction" type="action" description="Action if TRUE" />
		<property name="FalseAction" type="action" description="Action if FALSE" />
	</action>
*/

action_CSCondition = function() {
};

action_CSCondition.prototype.execute = function(currentNode) {
	var me = this;
	
	var val1 = parseFloat(window.csCore.vars[me.VarName]);
	var val2 = parseFloat(me.CompareValue);
	var res = false;
	
	switch(me.Operator) {
		case ">":  res = val1 > val2; break;
		case "<":  res = val1 < val2; break;
		case "==": res = val1 == val2; break;
		case ">=": res = val1 >= val2; break;
		case "<=": res = val1 <= val2; break;
		case "!=": res = val1 != val2; break;
		default:   res = false;
	}
	
	window.csCore.log("Condition: " + res + " (" + val1 + " " + me.Operator + " " + val2 + ")");
	
	if (res && me.TrueAction) {
		ccbInvokeAction(me.TrueAction, currentNode);
	} else if (!res && me.FalseAction) {
		ccbInvokeAction(me.FalseAction, currentNode);
	}
};