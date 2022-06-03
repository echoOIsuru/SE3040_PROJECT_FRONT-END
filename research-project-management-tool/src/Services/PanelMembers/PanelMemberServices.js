import axios from "axios";
const URL = 'http://localhost:8090/api/v1/';

// Register panel member
const registerPanelMember = (data) => {
    return axios.post(URL + "panel-member", data);
}

// Validate panel member login
const validateLogin = (data) => {
    return axios.post(URL + "panel-member-login", data);
}

// Set topic evaluation details
const setTopicEvaluationData = (data) => {
    return axios.post(URL + "topic-feedback", data);
}

// Set final presentation evaluation details
const setFinalPptData = (data) => {
    return axios.post(URL + "final-ppt-feedback", data);
}

// Get allocated panel data
const getPanelData = (user) => {
    return axios.get(URL + "panel/" + user);
}

// Get group details
const getGroupData = (id) => {
    return axios.get(URL + "group/" + id);
}

// Update topic evaluation status
const updateStatus = (id, data) => {
    return axios.put(URL + "evaluate-status/" + id, data);
}

// Delete rejected group records
const deleteRejectedRecord = (id) => {
    return axios.delete(URL + "rejected-group/" + id);
}

// Download topic details document
const topicDownload = (data) => {
    return axios.get(URL + "topic-download/" + data, {
        responseType: "blob"
    })
}

// Download marking scheme
const markingDownload = (data) => {
    return axios.get(URL + "marking-download/" + data, {
        responseType: "blob"
    })
}

// Download final presentation
const presentationDownload = (data) => {
    return axios.get(URL + "final-ppt-download/" + data, {
        responseType: "blob"
    })
}

export default {registerPanelMember, validateLogin, setTopicEvaluationData, setFinalPptData, getPanelData, getGroupData, updateStatus, deleteRejectedRecord, topicDownload, markingDownload, presentationDownload};