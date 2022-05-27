import axios from "axios";

const URL = "http://localhost:8090/api/v1/";

const downloadPDF = () => {
    return axios.get(URL + "supervisors/downloads", {
        responseType: "blob"
    })
}

const createSupervisor = (data) => axios.post(URL + "supervisors/", data)

const createTopicRequest = (data) => axios.post(URL + "supervisors-request-topic/", data)

export default { downloadPDF, createSupervisor, createTopicRequest }