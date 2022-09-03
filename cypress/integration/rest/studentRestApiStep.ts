import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import StudentRestClient from '../../support/apiClients/rest_client_student'
import { StudentGenerator, Student } from '../../support/apiHelpers/student_class'
import cypress = require('cypress')

/// <reference types="cypress" />

describe('Rest Api Suite', () => {
    let reqResponse: Cypress.Response<any>;
    let student: Student;
    let totalStudentCounts: number = 0;
    let classStudentCounts: number = 0;


    Given('I set up a basic url as {string}', (url: string) => {
        Cypress.config('baseUrl', url)
    });

    Then('Response code should be {int}', (code: number) => {
        expect(reqResponse.status).to.eq(code, "Response body contains correct data.");
    })

    Then('Response contains {string}', (expectedString: string) => {
        for (const prop in reqResponse.body) {
            if (prop.includes(expectedString))
                expect(reqResponse.body).contains(expectedString, "Response body contains correct data.")
          }
    })

    When('I get a list of all students', () => {
        StudentRestClient.getStudentList()
        .then((response) => {
            reqResponse = response
            totalStudentCounts = reqResponse.body.length
        })
    });

    When('I send a Get student list request', () => {
        StudentRestClient.getStudentList()
                .then((response) => {
                    reqResponse = response
                    totalStudentCounts = reqResponse.body.length
                })
    });

    When('I get a list of students by class name {string}', (className: string) => {
        StudentRestClient.getStudentsByClass(className)
        .then((response) => {
            reqResponse = response
            classStudentCounts = reqResponse.body.length
        })
    });

    When('I send a Get student list by class name {string} request', (className: string) => {
        StudentRestClient.getStudentsByClass(className)
        .then((response) => {
            reqResponse = response
            classStudentCounts = reqResponse.body.length
        })
    });

    When('I add a new student record', () => {
        student = StudentGenerator.GenerateStudent();
        StudentRestClient.addStudent(student)
                .then((response) => reqResponse = response)
                .then( () => expect(reqResponse.status).to.eql(200, "CREATE student API is successful"))
              
    });

    When('I send a Post create student request', () => {
        student = StudentGenerator.GenerateStudent();
        StudentRestClient.addStudent(student)
                .then((response) => reqResponse = response)
    });

    When('I search for last created student by id', () => {
        StudentRestClient.getStudent(student.id)
                .then((response) => reqResponse = response)
                .then( () => expect(reqResponse.status).to.equal(200, "GET Student API by id is successful"))
    });
    

    When('I search for student record by id {int}', (id: number) => {
        StudentRestClient.getStudent(id)
                .then((response) => reqResponse = response)
    });

    Then('Last created student record should not be found', () => {
        StudentRestClient.getStudent(student.id)
                .then((response) => reqResponse = response)
                .then( () => {
                    expect(reqResponse.body).to.eql([], `Student ${student.id} is not long in the student database`)
                }) 
    });

    When('I send a Get created student request', () => {
        StudentRestClient.getStudent(student.id)
                .then((response) => reqResponse = response)
    });

    When('I search for last created student by class and id', () => {
        StudentRestClient.getStudentByIdAndClass(student.id, student.studentClass)
                .then((response) => reqResponse = response)
                .then( () => expect(reqResponse.status).to.equal(200, "GET Student API by id and class is successful"))

    });

    When('I send a Get created student request with class and id', () => {
        StudentRestClient.getStudentByIdAndClass(student.id, student.studentClass)
                .then((response) => reqResponse = response)
    });

    When('I update last created student record', (table: any) => {
        let payload = table.rowsHash()
        payload['id'] = student.id
        student = Object.assign(student, payload)
        StudentRestClient.updateStudent(payload)
                .then((response) => reqResponse = response)
                .then( () => expect(reqResponse.status).to.equal(200, "PUT Student API by id is successful"))
                .then( () => {
                    const updatedStudent: Student = reqResponse.body
                    expect(student).to.eql(updatedStudent)
                })
    });

    When('I update a student record', (table: any) => {
        let payload = table.rowsHash()
        if (!student) {
            student = StudentGenerator.GenerateStudent(); 
        } 
        student = Object.assign(student, payload)
        StudentRestClient.updateStudent(payload)
                .then((response) => reqResponse = response)
    });

    When('I send a Put student request with body', (docString: string) => {
        let payload = JSON.parse(docString)
        payload['id'] = student.id
        StudentRestClient.updateStudent(payload)
                .then((response) => reqResponse = response)
    });

    When('I delete last created student record', () => {
        let payload = {'id': student.id}
        StudentRestClient.deleteStudent(payload)
                .then((response) => reqResponse = response)        
    });

    When('I delete a student record with id {int}', (id:number) => {
        let payload = {'id': id}
        StudentRestClient.deleteStudent(payload)
                .then((response) => reqResponse = response)        
    });

    When('I send a Delete student request', () => {
        let payload = {'id': student.id}
        StudentRestClient.deleteStudent(payload)
                .then((response) => reqResponse = response)
    });

    Then('Response contains {string}', (expectedString: string) => {
        for (const prop in reqResponse.body) {
            if (prop.includes(expectedString))
                expect(reqResponse.body).contains(expectedString, "Response body contains correct data.")
          }
    })

    Then('Record should contain correct student info', () => {
        const reqstudent: Student = reqResponse.body[0]
        expect(student).to.eql(reqstudent)
    })

    Then('Total student count should {string}', (verb:string) => {
        let expectedCount = totalStudentCounts;
        if (verb.includes('increase')) {
            expectedCount = totalStudentCounts + 1;
        } else if (verb.includes('decrease')) {
            expectedCount = totalStudentCounts - 1;
        }
        StudentRestClient.getStudentList()
        .then((response) => {
            reqResponse = response
            totalStudentCounts = reqResponse.body.length
            expect(totalStudentCounts).to.eql(expectedCount)
        })
    })

    Then('Student count should {string} in class {string}', (verb:string, className:string) => {
        let expectedCount = classStudentCounts;
        if (verb.includes('increase')) {
            expectedCount = classStudentCounts + 1;
        } else if (verb.includes('decrease')) {
            expectedCount = classStudentCounts - 1;
        }        
        StudentRestClient.getStudentsByClass(className)
        .then((response) => {
            reqResponse = response
            classStudentCounts = reqResponse.body.length
            expect(classStudentCounts).to.eql(expectedCount)
        })
    })

})