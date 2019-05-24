public without sharing class DCRFormAuraController {

@AuraEnabled
public static Map<String,Map<String,boolean>> getSobjectFields(Id recordId){
Map<String,Map<String,boolean>> sobjectfieldmap=new Map<String,Map<String,boolean>>();
String sobject_type=getsobjecttype(recordId);
set<String> MasterConfig=getMasterFields(sobject_type);

sobjectfieldmap.put(sobject_type,new Map<String,boolean>());

List<Schema.SObjectType> objects = new List<Schema.SObjectType>{ Contact.SObjectType};


    for(Schema.SObjectType objType: objects){
        for(Schema.SObjectField fld: objType.getDescribe().fields.getMap().values()){
            
            System.debug('API Field Name =  '+fld.getDescribe().getName());
        }
    }
Map<String, Schema.SObjectField> object_fields_map = Schema.getGlobalDescribe().get(sobject_type).getDescribe().fields.getMap();

						for (String fieldName: object_fields_map.keySet()) {
	System.debug('@@'+fieldName);
    try { 
		if(object_fields_map.get(fieldName).getDescribe().isUpdateable())
      //  fieldNames.add(object_fields_map.get(fieldName).getDescribe().getName());
	  sobjectfieldmap.get(sobject_type).put(object_fields_map.get(fieldName).getDescribe().getName(),MasterConfig.contains(object_fields_map.get(fieldName).getDescribe().getName()));
    } catch (SObjectException e)    { 
        
    }
}

return sobjectfieldmap;	
}

public static string getsobjecttype(Id recordId){
	//Id myId='001S000000yW8jQIAS';
	Schema.SObjectType sobjectType = recordId.getSObjectType();
String sobjectName = sobjectType.getDescribe().getName();

SObject record = Database.query('Select Id, Name From ' + sobjectName + ' Where Id = :recordId');
return sobjectName;	
}
@TestVisible
private static set<String> getMasterFields(String sobject_type){
//Dummy logic to return Masterfields. Once MasterConfig design is confirmed, this will be replaced with actual code. 
set<String> Masterfields=new set<String>();
Masterfields.add('Name');
return Masterfields;



}



}