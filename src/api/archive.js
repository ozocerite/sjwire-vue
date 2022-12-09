import http from './http.js';

function getArchiveFileList(){
    return http.get("/api/archive/list/", {});
}

function getArchivePost(data){
    return http.get("/api/archive/one/?post_id="+data, {});
}

function addArchivePost(data){
    return http.post("/api/archive/add/",
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

function modifyArchivePost(data){
    return http.post("/api/archive/modify/",
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

function removeArchivePost(data){
    return http.post("/api/archive/remove/", data)
        .then(response => {
            return response;
        })
        .catch(error =>{
            return error;
        });
}

export{
    getArchiveFileList,
    getArchivePost,
    addArchivePost,
    modifyArchivePost,
    removeArchivePost,
}