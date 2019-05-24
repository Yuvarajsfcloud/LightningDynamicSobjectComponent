({
	doInit: function (component, event, helper) {
		helper.getSobjectconfig(component);

	},
	cancel: function (component, helper) {
		var navEvt = $A.get("e.force:navigateToSObject");
		navEvt.setParams({
			"recordId": component.get("v.recordId"),
			"slideDevName": "related"
		});
		navEvt.fire();


		component.set("v.showSpinner", false);
	},

	handleLoad: function (component, event, helper) {
		console.log('handle handleLoad');
		component.set("v.showSpinner", false);
	},
	handleSubmit: function (component, event, helper) {
		/*  event.preventDefault(); // Prevent default submit
		  var fields = event.getParam("fields");
		  
		  component.find('createAccountForm').submit(fields); // Submit form
		  console.log('handle handleSubmit');*/
	},
	handleSuccess: function (component, event, helper) {
		console.log('record updated successfully');
		var navEvt = $A.get("e.force:navigateToSObject");
		navEvt.setParams({
			"recordId": component.get("v.recordId"),
			"slideDevName": "related"
		});
		navEvt.fire();


		component.set("v.showSpinner", false);
	},
})