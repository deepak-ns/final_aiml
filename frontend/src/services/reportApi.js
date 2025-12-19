import api from "./api";

export const generateReport = async (machineId) => {
    const response = await api.get(`/reports/${machineId}`, {
        responseType: "blob",
    });
    return response.data;
};
