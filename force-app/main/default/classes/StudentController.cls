public with sharing class StudentController {
    @AuraEnabled
    public static List<HocSinh__c> getStudentList(){
        try{
            List<HocSinh__c> students = [
                                            SELECT Id
                                                , HoHocSinh__c
                                                , Name
                                                , NgaySinh__c
                                                , GioiTinh__c
                                                , Diem1__c
                                                , Diem2__c
                                                , Diem3__c
                                                , DiemTB__c
                                                , TinhTrang__c
                                            FROM HocSinh__c];
            return students;
        } catch(Exception e) {
            return null;
        }
    }
}