import http from './http.js';

function getQnaList(){
    return http.get("/api/user_qna/list/", {});
}

function getQnaMyList(data){
    return http.get("/api/user_qna/mylist/?user_id="+data, {});
}

function getQna(data){
    return http.get("/api/user_qna/one/?qna_id="+data, {});
}

function addQna(data){
    return http.post("/api/user_qna/add/",
        data,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            return response;
        })
        .catch(error =>{
            return error;
        });
}

function modifyQna(data){
    return http.post("/api/user_qna/modify/",
        data,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            return response;
        })
        .catch(error =>{
            return error;
        });
}

function removeQna(data){
    return http.post("/api/user_qna/remove/", data)
        .then(response => {
            return response;
        })
        .catch(error =>{
            return error;
        });
}

function updateAnswer(data){
    return http.post("/api/user_qna/answer/", data)
        .then(response => {
            return response;
        })
        .catch(error =>{
            return error;
        });
}

export {
    getQnaList,
    getQnaMyList,
    getQna,
    addQna,
    modifyQna,
    removeQna,
    updateAnswer,
}