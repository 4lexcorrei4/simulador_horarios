const urls = {
    base: () => "https://api.horarios.bitsys.tech/get?url=",
    departments: () => urls.base() + "/departments",
    departmentSubjects: (depId) => urls.base() + "/department/" + depId
};

export default urls;