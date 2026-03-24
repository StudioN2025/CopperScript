// This is a scripted coppercube behavior.
// Advanced trigger with multiple start conditions.
//
/*
	<behavior jsname="behavior_CSAdvancedTrigger" description="CopperScript: Advanced Trigger">
		<property name="TriggerOnStart" type="bool" default="false" description="Trigger when scene starts" />
		<property name="TriggerOnClick" type="bool" default="false" description="Trigger when clicked" />
		<property name="TriggerOnCollision" type="bool" default="false" description="Trigger on collision" />
		<property name="TriggerOnTimer" type="bool" default="false" description="Trigger on timer" />
		<property name="TimerSeconds" type="float" default="5.0" description="Seconds if timer enabled" />
		<property name="TriggerOnKeyPress" type="bool" default="false" description="Trigger on key press" />
		<property name="KeyCode" type="string" default="Space" description="Key code (Space, Enter, E, etc)" />
		<property name="TriggerOnVariable" type="bool" default="false" description="Trigger when variable changes" />
		<property name="VariableName" type="string" default="myVar" description="Variable to watch" />
		<property name="VariableValue" type="string" default="1" description="Value to compare" />
		<property name="TriggerOnce" type="bool" default="true" description="Trigger only once" />
		<property name="ActionToExecute" type="action" description="Action to run when triggered" />
		<property name="RepeatDelayMs" type="int" default="0" description="Delay before can trigger again (ms)" />
	</behavior>
*/

behavior_CSAdvancedTrigger = function(node) 
{
	this.node = node;
	this.triggered = false;
	this.lastTriggerTime = 0;
	this.timerActive = false;
};

behavior_CSAdvancedTrigger.prototype.onStart = function(scene) 
{
	var me = this;
	
	if (!window.csCore) {
		window.csCore = window.csCore || {};
		window.csCore.vars = window.csCore.vars || {};
		window.csCore.log = function(msg) { console.log("[CS]: " + msg); };
	}
	
	if (this.TriggerOnStart) {
		this.executeTrigger();
	}
	
	if (this.TriggerOnTimer && !this.timerActive && !this.triggered) {
		this.timerActive = true;
		setTimeout(function() {
			if (me.TriggerOnTimer && !me.triggered) {
				me.executeTrigger();
			}
			me.timerActive = false;
		}, this.TimerSeconds * 1000);
	}
	
	if (this.TriggerOnKeyPress) {
		window.addEventListener('keydown', function(e) {
			if (me.triggered && me.TriggerOnce) return;
			
			var key = e.key;
			if (key === me.KeyCode || e.code === me.KeyCode) {
				e.preventDefault();
				me.executeTrigger();
			}
		});
	}
	
	if (this.TriggerOnVariable) {
		var originalSet = window.csCore.set;
		if (!window.csCore._watcherActive) {
			window.csCore._watcherActive = true;
			window.csCore.set = function(key, val) {
				var oldVal = window.csCore.vars[key];
				if (originalSet) originalSet(key, val);
				else window.csCore.vars[key] = val;
				
				if (me.TriggerOnVariable && key === me.VariableName) {
					var targetVal = me.VariableValue;
					var currentVal = val;
					
					if (currentVal == targetVal || String(currentVal) === targetVal) {
						me.executeTrigger();
					}
				}
			};
		}
	}
};

behavior_CSAdvancedTrigger.prototype.onClick = function() 
{
	if (this.TriggerOnClick) {
		this.executeTrigger();
	}
};

behavior_CSAdvancedTrigger.prototype.onCollision = function(otherNode) 
{
	if (this.TriggerOnCollision) {
		this.executeTrigger();
	}
};

behavior_CSAdvancedTrigger.prototype.executeTrigger = function() 
{
	var me = this;
	var now = Date.now();
	
	if (this.TriggerOnce && this.triggered) {
		return;
	}
	
	if (this.RepeatDelayMs > 0 && (now - this.lastTriggerTime) < this.RepeatDelayMs) {
		return;
	}
	
	this.triggered = true;
	this.lastTriggerTime = now;
	
	window.csCore.log("Trigger executed on " + this.node.getName());
	
	if (this.ActionToExecute) {
		ccbInvokeAction(this.ActionToExecute, this.node);
	}
	
	if (!this.TriggerOnce) {
		setTimeout(function() {
			me.triggered = false;
		}, 100);
	}
};