({
	getSobjectconfig : function(cmp) {
		
		var action = cmp.get("c.getSobjectFields");
		action.setParams({ recordId : cmp.get("v.rcdId") });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var StoreResponse=response.getReturnValue();
                var sobjectname;
              console.log("From server: " + StoreResponse);
              for (var sobjkey in StoreResponse) {
                cmp.set("v.sobjecttype",sobjkey);
            }
            var fieldconfig =StoreResponse[cmp.get("v.sobjecttype")];
        //    cmp.set("v.sobjectFieldMap",fieldconfig); 

       
        var fieldmap=[];
            for (var sobjkey in fieldconfig) {
                    fieldmap.push({key: sobjkey, value: fieldconfig[sobjkey]});
               
            }   
            cmp.set("v.sobjectFieldMap",fieldmap); 
            
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    	
    }
    
     /***helper code 

     var action = cmp.get("c.getSobjectFields");
     action.setParams({ sobject_type : cmp.get("v.sobjecttype") });

     action.setCallback(this, function(response) {
         var state = response.getState();
         if (state === "SUCCESS") {
           console.log("From server: " , response.getReturnValue());
             cmp.set("v.fields",response.getReturnValue());
         }
         else if (state === "ERROR") {
             var errors = response.getError();
             if (errors) {
                 if (errors[0] && errors[0].message) {
                     console.log("Error message: " + 
                              errors[0].message);
                 }
             } else {
                 console.log("Unknown error");
             }
         }
     });
     $A.enqueueAction(action);
     
           * */
})