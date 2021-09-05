const urls = {
    base: () => "https://horarios-api.bitsys.tech",
    departments: () => urls.base() + "/departments",
    departmentSubjects: (depId) => urls.departments() + "/" + depId + "/subjects",
    subject: (depId, subId) => urls.departmentSubjects(depId) + "/" + subId,
    updates: () => urls.base() + "/updates",
    semester: () => urls.base() + "/semester"
};

export default urls;
