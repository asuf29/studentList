class Student {
    constructor(name, surname, studentNumber) {
        this.name = name;
        this.surname = surname;
        this.studentNumber = studentNumber;
    }
}

class UI {
    addStudentToList(student) {
        const list = document.getElementById('student-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.surname}</td>
            <td>${student.studentNumber}</td>
            <td><a href="" class="delete">X</a></td>
        `;
        list.appendChild(row); //appendChild ile listeye ekledim
    }
    
    showAlert(message, className) {
        const div = document.createElement('div');

        //add className
        div.className = `alert ${className}`;

        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');

        //get form 
        const form = document.querySelector('#student-form');

        //insert alert
        container.insertBefore(div, form);

        //timeout after 3 second
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteStudent(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
    
    clearAll() {
        document.getElementById('name').value = '';
        document.getElementById('surname').value = '';
        document.getElementById('studentNumber').value = '';
    }
}

//Event Listening
document.getElementById('student-form').addEventListener('submit', function(e) {
    //get form valuesIt
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const studentNumber = document.getElementById('studentNumber').value;

    const student = new Student(name, surname, studentNumber);

    const ui = new UI();

    //validate
    if(name === '' || surname === '' || studentNumber === '') {
        //error alert
        ui.showAlert('Please enter your information.', 'error');
    } else {
        //add student to list
        ui.addStudentToList(student);

        //show success
        ui.showAlert('Student Added Successfully', 'success');

        //clear all students
        ui.clearAll();
    }
   
    e.preventDefault();
})

//Event listening for delete
document.getElementById('student-list').addEventListener('click', function(e) {
    //instantiate UI
    const ui = new UI();

    //delete student
    ui.deleteStudent(e.target);

    //show message
    ui.showAlert('Student Deleted', 'success');

    e.preventDefault();
});