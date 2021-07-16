import axios from "axios";
import urls from "./urls";

export function getDepartments() {
    return axios.get(urls.departments());
}

export function getDepartmentSubjects(department) {
    return axios.get(urls.departmentSubjects(department));
}

export function getSubject(department, subject) {
    return axios.get(urls.subject(department, subject));
}

export function getUpdates() {
    return axios.get(urls.updates());
}

export function getTime() {
    return axios.get(urls.time());
}

/*
export function lastUpdate(year, time) {
    return axios.get(urls.lastUpdate(year, time));
}

export function getDepartments() {
    return axios.get(urls.departments());
}

export function getDepartmentSubjects(department) {
    return axios.get(urls.departmentSubjects(department));
}

export function getDepartmentSubjectsByYear(department, year) {
    return axios.get(urls.departmentSubjectsByYear(department, year));
}

export function getSubject(subject) {
    return axios.get(urls.subject(subject));
}

export function getSubjectShifts(subject, year, time) {
    return axios.get(urls.subjectShifts(subject, year, time));
}*/
