// This is a scripted coppercube action.
// Switch statement for multiple cases.
//
/*
	<action jsname="action_CSSwitch" description="CopperScript: Switch Statement">
		<property name="VarName" type="string" default="myVar" description="Variable to check" />
		<property name="Case1Value" type="string" default="1" description="Case 1 value" />
		<property name="Case1Action" type="action" description="Action for case 1" />
		<property name="Case2Value" type="string" default="2" description="Case 2 value" />
		<property name="Case2Action" type="action" description="Action for case 2" />
		<property name="Case3Value" type="string" default="3" description="Case 3 value" />
		<property name="Case3Action" type="action" description="Action for case 3" />
		<property name="Case4Value" type="string" default="4" description="Case 4 value" />
		<property name="Case4Action" type="action" description="Action for case 4" />
		<property name="DefaultAction" type="action" description="Default action if no case matches" />
	</action>
*/

action_CSSwitch = function() 
{
};

action_CSSwitch.prototype.execute = function(currentNode) 
{
	var me = this;
	
	if (!window.csCore) {
		console.error("[CS]: Core not initialized!");
		return;
	}
	
	var value = window.csCore.vars[me.VarName];
	var valueStr = String(value);
	var matched = false;
	
	window.csCore.log("Switch: Checking variable '" + me.VarName + "' = " + valueStr);
	
	// Check each case
	var cases = [
		{ val: me.Case1Value, action: me.Case1Action },
		{ val: me.Case2Value, action: me.Case2Action },
		{ val: me.Case3Value, action: me.Case3Action },
		{ val: me.Case4Value, action: me.Case4Action }
	];
	
	for (var i = 0; i < cases.length; i++) {
		var caseVal = String(cases[i].val);
		var caseAction = cases[i].action;
		
		if (caseVal !== "undefined" && caseAction && valueStr === caseVal) {
			window.csCore.log("Switch: Case " + (i+1) + " matched, executing action");
			ccbInvokeAction(caseAction, currentNode);
			matched = true;
			break;
		}
	}
	
	if (!matched && me.DefaultAction) {
		window.csCore.log("Switch: No case matched, executing default action");
		ccbInvokeAction(me.DefaultAction, currentNode);
	}
};