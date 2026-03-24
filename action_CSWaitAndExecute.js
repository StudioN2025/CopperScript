// This is a scripted coppercube action.
// Waits for specified seconds and then executes an action.
//
/*
	<action jsname="action_CSWaitAndExecute" description="CopperScript: Wait X Seconds Then Execute">
		<property name="WaitSeconds" type="float" default="1.0" description="Seconds to wait" />
		<property name="ActionToExecute" type="action" description="Action to execute" />
		<property name="ContinueImmediately" type="bool" default="false" description="Continue other actions while waiting" />
	</action>
*/

action_CSWaitAndExecute = function() 
{
};

action_CSWaitAndExecute.prototype.execute = function(currentNode) 
{
	var me = this;
	var node = currentNode;
	
	if (!window.csCore) {
		console.error("[CS]: Core not initialized!");
		return;
	}
	
	window.csCore.log("Waiting " + me.WaitSeconds + " seconds...");
	
	if (me.ContinueImmediately) {
		setTimeout(function() {
			window.csCore.log("Wait finished, executing action");
			if (me.ActionToExecute) {
				ccbInvokeAction(me.ActionToExecute, node);
			}
		}, me.WaitSeconds * 1000);
		return true;
	} 
	else 
	{
		var actionsQueue = this.nextActions;
		
		setTimeout(function() {
			window.csCore.log("Wait finished, executing action");
			if (me.ActionToExecute) {
				ccbInvokeAction(me.ActionToExecute, node);
			}
			
			if (actionsQueue && actionsQueue.length > 0) {
				for (var i = 0; i < actionsQueue.length; i++) {
					if (actionsQueue[i]) {
						ccbInvokeAction(actionsQueue[i], node);
					}
				}
			}
		}, me.WaitSeconds * 1000);
		
		return false;
	}
};

action_CSWaitAndExecute.prototype.setNextActions = function(actions) 
{
	this.nextActions = actions;
};