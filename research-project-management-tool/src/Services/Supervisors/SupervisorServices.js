import axios from "axios";

// const URL = "http://localhost:8090/api/v1/";
const URL = "https://p9b173fk99.execute-api.us-east-1.amazonaws.com/dev/api/v1/";

const downloadPDF = (data) => {
    return axios.get(URL + "supervisors/downloads/" + data, {
        responseType: "blob"
    })
}

const createSupervisor = (data) => axios.post(URL + "supervisors/", data)

const createTopicRequest = (data) => axios.post(URL + "supervisors-request-topic/", data)

const validateSupervisor = (data) => axios.post(URL + "supervisors-validate/", data)

const getSupervisorByField = (data) => axios.get(URL + "supervisors-field/" + data)

const getTopicRequestBySupervisor = (data) => axios.get(URL + "supervisors-topic-requests/" + data)

const createChat = (data) => axios.post(URL + "supervisors-chat-service/", data)

const addNewChat = (data) => axios.patch(URL + "supervisors-chat-service/", data)

const viewChatByGroup = (data) => axios.get(URL + "supervisors-chat-view-group/" + data)

const viewChatBySupervisorId = (data) => axios.get(URL + "supervisors-chat-view/" + data)

const setSupervisorRequestStatus = (data) => axios.patch(URL + "supervisors-requests-status/", data)

const getAllGroups = () => axios.get(URL + "supervisors-all-groups")

const getGroupByStudentNIC = (data) => axios.get(URL + "supervisors-student-nic/" + data)

const getSuperviosrById = (data) => axios.get(URL + "supervisors/" + data)

const getTopicRequestByGroupRecordID = (data) => axios.get(URL + "supervisors-topic-by-group/" + data);

const deleteTopicRequestByID = (data) => axios.delete(URL + "supervisors-request-topic/" + data)

const getTopicRequestByGroupName = (data) => axios.get(URL + "supervisors-topic-by-gname/" + data)

const getAllDocumentSubmissions = () => axios.get(URL + "supervisors-documet-submissions")

const downloadSupervisorMarking = () => {
    return axios.get(URL + "supervisors/marking-downloads", {
        responseType: "blob"
    })
}

const createSupervisorFeedback = (data) => axios.post(URL + "supervisors-feedback", data)

export default {
    downloadPDF, createSupervisor, createTopicRequest, validateSupervisor, getSupervisorByField,
    getTopicRequestBySupervisor, createChat, addNewChat, viewChatByGroup, viewChatBySupervisorId,
    setSupervisorRequestStatus, getAllGroups, getGroupByStudentNIC, getSuperviosrById,
    getTopicRequestByGroupRecordID, deleteTopicRequestByID, getTopicRequestByGroupName, getAllDocumentSubmissions,
    downloadSupervisorMarking, createSupervisorFeedback
}