export const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getUserRole = () => {
    const role = localStorage.getItem("role");
    return role ? role.toLowerCase() : null;
};
