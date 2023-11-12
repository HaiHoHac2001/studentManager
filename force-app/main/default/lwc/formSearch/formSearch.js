import { LightningElement, track } from 'lwc';
import getStudentList from '@salesforce/apex/StudentController.getStudentList';

const columns = [
    { label: 'Họ', fieldName: 'HoHocSinh__c', editable: true },
    { label: 'Tên', fieldName: 'Name', type: 'text', editable: true },
    { label: 'Ngày sinh', fieldName: 'NgaySinh__c', type: 'date', editable: true, typeAttributes: { year: "numeric", month: "2-digit", day: "2-digit" }},
    { label: 'Giới tính', fieldName: 'GioiTinh__c', editable: true },
    { label: 'Điểm 1', fieldName: 'Diem1__c', type: 'float', editable: true },
    { label: 'Điểm 2', fieldName: 'Diem2__c', type: 'float', editable: true },
    { label: 'Điểm 3', fieldName: 'Diem3__c', type: 'float', editable: true },
    { label: 'Điểm TB', fieldName: 'DiemTB__c', type: 'float', editable: true },
    { label: 'Điểm tình trạng', fieldName: 'TinhTrang__c', type: 'float', editable: true },
];
export default class FormSearch extends LightningElement {
    @track value = '';
    @track loading = false;
    @track data = [];
    columns = columns;
    rowOffset = 0;

    connectedCallback() {
        this.getStudents();
    }

    get options() {
        return [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Finished', value: 'finished' },
        ];
    }

    //display no records
    get isDisplayNoRecords() {
        var isDisplay = true;
        if(this.data){
            if(this.data.length == 0){
                isDisplay = true;
            }else{
                isDisplay = false;
            }
        }
        return isDisplay;
    }

    getStudents() {
        this.loading = true;
        getStudentList()
            .then((result) => {
                this.loading = false;
                
                this.data = result.map(row => {
                return {
                    ...row,
                    GioiTinh__c: row.GioiTinh__c ? 'Nam' : 'Nữ'
                };;
            })})
            .catch((error) => {
                this.loading = false;
            });
    }

    handleChange(event) {
        this.value = event.detail.value;
    }

}