@isTest
public class DCRFormAuraControllerTest
{
	@isTest
	public static void method1()	
	{
		Test.startTest();

		Account a=new Account();
		a.Name='TestAccount1';
		insert a;
		DCRFormAuraController dcr= new DCRFormAuraController();
		String sobjecttype=	DCRFormAuraController.getsobjecttype(a.Id);
		DCRFormAuraController.getSobjectFields(sobjecttype); 
		dcr.getMasterFields(sobjecttype);
		System.assertEquals(sobjecttype,'Account');
		
		Test.stopTest();
		

	}
}