import axios from "axios";
import urls from "./urls";

export function getDepartments() {
    return axios.get(urls.departments());
}

export function getDepartmentSubjects(department) {
    return axios.get(urls.departmentSubjects(department));
}

export function getSubject(subject) {
    return axios.get(urls.subject(subject));
}

export function getSubjectShifts(instance) {
    return axios.get(urls.subjectShifts(instance));
}