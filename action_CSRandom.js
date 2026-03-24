// This is a scripted coppercube action.
// Sets a random value to a CopperScript variable.
//
/*
	<action jsname="action_CSRandom" description="CopperScript: Set Random Value">
		<property name="VarName" type="string" default="randomValue" description="Variable name" />
		<property name="MinValue" type="int" default="1" description="Minimum value" />
		<property name="MaxValue" type="int" default="100" description="Maximum value" />
		<property name="Integer" type="bool" default="true" description="Integer value" />
		<property name="StoreInTemp" type="bool" default="false" description="Store in temp variable" />
	</action>
*/

action_CSRandom = function() {
};

action_CSRandom.prototype.execute = function(currentNode) {
	var me = this;
	
	var val;
	if (me.Integer) {
		val = Math.floor(Math.random() * (me.MaxValue - me.MinValue + 1)) + me.MinValue;
	} else {
		val = Math.random() * (me.MaxValue - me.MinValue) + me.MinValue;
	}
	
	window.csCore.vars[me.VarName] = val;
	window.csCore.log("Random " + me.VarName + " = " + val);
	
	if (me.StoreInTemp) {
		window.csTemp = window.csTemp || {};
		window.csTemp.lastRandom = val;
	}
	
	try {
		localStorage.setItem("cs_save_data", JSON.stringify(window.csCore.vars));
	} catch(e) {}
};