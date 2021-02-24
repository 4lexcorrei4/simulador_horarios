import axios from "axios";
import urls from "./urls";

export function getDepartments() {
    return axios.get(urls.departments());
}

export function getDepartmentSubjects(department) {
    return axios.get(urls.departmentSubjects(department));
}