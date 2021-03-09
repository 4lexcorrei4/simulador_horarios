const urls = {
    base: () => "https://api.horarios.bitsys.tech/get?url=",
    departments: () => urls.base() + "/departments",
    departmentSubjects: (depId) => urls.base() + "/department/" + depId,
    departmentSubjectsByYear: (depId, year) => urls.base() + "/department/" + depId + "/class_instances?year=" + year,
    subject: (subject) => urls.base() + "/class/" + subject,
    subjectShifts: (subject, year, time) => "https://api.horarios.bitsys.tech/class/" + subject + "/" + year + "/" + time
};

export default urls;