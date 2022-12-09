import http from './http.js';

function getHistoryList(){
    return http.get("/api/history/list", {});
}

function addHistory(data){
    return http.post("/api/history/add/", data)
        .then(response => {
            return response;
        })
        .catch(error =>{
            return error;
        });
}

function modifyHistory(data){
    return http.post("/api/history/modify/", data)
        .then(response => {
            return response;
        })
        .catch(error =>{
            return error;
        });
}

function moveHistorySeq(data){
    return http.post("/api/history/move/", data)
        .then(response => {
            return response;
        })
        .catch(error =>{
            return error;
        });
}

function removeHistory(data){
    return http.post("/api/history/remove/", data)
        .then(response => {
            return response;
        })
        .catch(error =>{
            return error;
        });
}

export {
    getHistoryList,
    addHistory,
    modifyHistory,
    moveHistorySeq,
    removeHistory,
}