const urls = {
    base: () => "https://api.new.bitsys.tech",
    departments: () => urls.base() + "/departments",
    departmentSubjects: (depId) => urls.departments() + "/" + depId + "/subjects",
    subject: (depId, subId) => urls.departmentSubjects(depId) + "/" + subId,
    updates: () => urls.base() + "/updates",
    semester: () => urls.base() + "/semester"

    /*lastUpdate: (year, time) => "https://api.horarios.bitsys.tech/lastupdate?year=" + year + "&time=" + time,
    departments: () => urls.base() + "/departments",
    departmentSubjects: (depId) => urls.base() + "/department/" + depId,
    departmentSubjectsByYear: (depId, year) => urls.base() + "/department/" + depId + "/class_instances?year=" + year,
    subject: (subject) => urls.base() + "/class/" + subject,
    subjectShifts: (subject, year, time) => "https://api.horarios.bitsys.tech/class/" + subject + "/" + year + "/" + time*/
};

export default urls;
