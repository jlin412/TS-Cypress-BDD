import { Student } from '../apiHelpers/student_class'

/// <reference types="cypress" />

class StudentRestClient {
    static getStudentList = () => {
        return cy.request({
            method: 'GET',
            url: '/fetchStudents'
        })
    }

    static addStudent = (student: Student) => {
        return cy.request({
            method: 'POST',
            url: '/addStudent',
            body: student
        })
    }

    static getStudent = (id: number) => {
        return cy.request({
            method: 'GET',
            url:  '/fetchStudents',
            qs: {
                'id': id
            },
            failOnStatusCode: false
        })
    }
z
    static getStudentsByClass = (studentClass: string) => {
        return cy.request({
            method: 'GET',
            url: '/fetchStudents',
            qs: {
                'studentClass': studentClass
            },            
            failOnStatusCode: true
        })
    }

    static getStudentByIdAndClass = (id: number, studentClass: string) => {
        return cy.request({
            method: 'GET',
            url: '/fetchStudents',
            qs: {
                'id': id,
                'studentClass': studentClass
            },      
            failOnStatusCode: false
        })
    }

    static updateStudent = (payload: Object) => {
        return cy.request({
            method: 'PUT',
            url: '/updateStudent',
            body: payload,
            failOnStatusCode: false
        })
    }

    static deleteStudent = (payload: Object) => {
        return cy.request({
            method: 'DELETE',
            url: '/deleteStudent',
            body: payload,
            failOnStatusCode: false
        })
    }
    
}
export default StudentRestClient;