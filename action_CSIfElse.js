// This is a scripted coppercube action.
// If-Else statement with multiple conditions and actions.
//
/*
	<action jsname="action_CSIfElse" description="CopperScript: If-Else Statement">
		<property name="ConditionType" type="string" default="variable" description="Condition type: variable, compare, random, exists" />
		<property name="VarName" type="string" default="myVar" description="Variable name for condition" />
		<property name="Operator" type="string" default="==" description="Operator: ==, !=, >, <, >=, <=" />
		<property name="CompareValue" type="string" default="0" description="Value to compare" />
		<property name="CompareVar" type="string" default="" description="Compare with another variable" />
		<property name="RandomMin" type="int" default="1" description="Random min value" />
		<property name="RandomMax" type="int" default="100" description="Random max value" />
		<property name="RandomSuccess" type="int" default="50" description="Success threshold (value >= this)" />
		<property name="IfAction" type="action" description="Action if condition is TRUE" />
		<property name="ElseAction" type="action" description="Action if condition is FALSE" />
		<property name="ElseIfActions" type="string" default="" description="Advanced: JSON array of else-if conditions (optional)" />
	</action>
*/

action_CSIfElse = function() 
{
};

action_CSIfElse.prototype.execute = function(currentNode) 
{
	var me = this;
	var result = false;
	var conditionType = me.ConditionType || "variable";
	
	if (!window.csCore) {
		console.error("[CS]: Core not initialized!");
		window.csCore = window.csCore || {};
		window.csCore.vars = window.csCore.vars || {};
		window.csCore.log = function(msg) { console.log("[CS]: " + msg); };
	}
	
	// Check condition based on type
	switch(conditionType) {
		case "variable":
			// Compare variable with a value
			var varValue = window.csCore.vars[me.VarName];
			var compareVal = parseFloat(me.CompareValue);
			var operator = me.Operator;
			
			if (varValue === undefined) {
				result = false;
				window.csCore.log("If-Else: Variable '" + me.VarName + "' not found");
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
				window.csCore.log("If-Else: " + me.VarName + "(" + numValue + ") " + operator + " " + compareVal + " = " + result);
			}
			break;
			
		case "compare":
			// Compare two variables
			var val1 = parseFloat(window.csCore.vars[me.VarName] || 0);
			var val2 = parseFloat(window.csCore.vars[me.CompareVar] || 0);
			var op = me.Operator;
			
			switch(op) {
				case "==": result = val1 == val2; break;
				case "!=": result = val1 != val2; break;
				case ">":  result = val1 > val2; break;
				case "<":  result = val1 < val2; break;
				case ">=": result = val1 >= val2; break;
				case "<=": result = val1 <= val2; break;
				default: result = false;
			}
			window.csCore.log("If-Else: " + me.VarName + "(" + val1 + ") " + op + " " + me.CompareVar + "(" + val2 + ") = " + result);
			break;
			
		case "random":
			// Random chance condition
			var min = me.RandomMin || 1;
			var max = me.RandomMax || 100;
			var threshold = me.RandomSuccess || 50;
			var randomVal = Math.floor(Math.random() * (max - min + 1)) + min;
			result = randomVal >= threshold;
			window.csCore.log("If-Else: Random " + randomVal + " >= " + threshold + " = " + result);
			break;
			
		case "exists":
			// Check if variable exists
			result = window.csCore.vars[me.VarName] !== undefined;
			window.csCore.log("If-Else: Variable '" + me.VarName + "' exists = " + result);
			break;
			
		case "true":
			// Always true
			result = true;
			window.csCore.log("If-Else: Always TRUE");
			break;
			
		case "false":
			// Always false
			result = false;
			window.csCore.log("If-Else: Always FALSE");
			break;
			
		default:
			result = false;
			window.csCore.log("If-Else: Unknown condition type: " + conditionType);
	}
	
	// Execute appropriate action
	if (result) {
		if (me.IfAction) {
			window.csCore.log("If-Else: Executing TRUE branch");
			ccbInvokeAction(me.IfAction, currentNode);
		}
	} else {
		if (me.ElseAction) {
			window.csCore.log("If-Else: Executing FALSE branch");
			ccbInvokeAction(me.ElseAction, currentNode);
		}
	}
};