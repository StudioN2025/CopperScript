// This is a scripted coppercube action.
// Advanced if-else-if chain with multiple conditions.
//
/*
	<action jsname="action_CSIfChain" description="CopperScript: If-Else-If Chain">
		<property name="ConditionsJSON" type="string" default='[{"var":"gold","op":">","val":100,"action":"buy_item"},{"var":"level","op":">=","val":5,"action":"unlock_skill"}]' description='JSON array of conditions and actions: [{"var":"name","op":"==","val":"value","action":"action_name"}, ...]' />
		<property name="ElseAction" type="action" description="Default action if no conditions match" />
		<property name="StopOnMatch" type="bool" default="true" description="Stop checking after first match" />
	</action>
*/

action_CSIfChain = function() 
{
};

action_CSIfChain.prototype.execute = function(currentNode) 
{
	var me = this;
	var conditions = [];
	
	if (!window.csCore) {
		console.error("[CS]: Core not initialized!");
		window.csCore = window.csCore || {};
		window.csCore.vars = window.csCore.vars || {};
		window.csCore.log = function(msg) { console.log("[CS]: " + msg); };
		window.csCore.actions = window.csCore.actions || {};
	}
	
	// Parse conditions JSON
	try {
		conditions = JSON.parse(me.ConditionsJSON);
	} catch(e) {
		console.error("[CS]: Failed to parse ConditionsJSON", e);
		return;
	}
	
	if (!conditions || conditions.length === 0) {
		window.csCore.log("If-Else-If Chain: No conditions defined");
		if (me.ElseAction) {
			ccbInvokeAction(me.ElseAction, currentNode);
		}
		return;
	}
	
	// Check each condition in order
	for (var i = 0; i < conditions.length; i++) {
		var cond = conditions[i];
		var result = false;
		
		// Evaluate condition
		if (cond.var && cond.op) {
			var varValue = window.csCore.vars[cond.var];
			var compareVal = parseFloat(cond.val);
			var operator = cond.op;
			
			if (varValue === undefined) {
				result = false;
			} else {
				var numValue = parseFloat(varValue);
				switch(operator) {
					case "==": result = numValue == compareVal; break;
					case "!=": result = numValue != compareVal; break;
					case ">":  result = numValue > compareVal; break;
					case "<":  result = numValue < compareVal; break;
					case ">=": result = numValue >= compareVal; break;
					case "<=": result = numValue <= compareVal; break;
					default: result = false;
				}
			}
			
			window.csCore.log("If-Else-If Chain: Condition " + (i+1) + " = " + result);
			
			if (result) {
				// Execute the associated action
				var actionName = cond.action;
				if (actionName && window.csCore.actions[actionName]) {
					window.csCore.log("If-Else-If Chain: Executing action: " + actionName);
					ccbInvokeAction(window.csCore.actions[actionName], currentNode);
				} else if (cond.action) {
					window.csCore.log("If-Else-If Chain: Action not found: " + actionName);
				}
				
				// Stop if needed
				if (me.StopOnMatch) {
					return;
				}
			}
		}
	}
	
	// If no conditions matched, execute else action
	if (me.ElseAction) {
		window.csCore.log("If-Else-If Chain: No match, executing ELSE");
		ccbInvokeAction(me.ElseAction, currentNode);
	}
};