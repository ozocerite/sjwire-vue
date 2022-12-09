import http from './http.js';

function getUserList(){
    return http.get("/api/user/list/", {});
}

function getUser(data){
    return http.get("/api/user/info/?user_id="+data, {});
}

function modifyUser(data){
    return http.post("/api/user/modify/", data)
        .then(response => {
            session.setItem('user',JSON.stringify(response.data));
            return response;
        })
        .catch(error =>{
            return error;
        });
}

function removeUser(data){
    return http.post("/api/user/remove/", data)
        .then(response => {
            return response;
        })
        .catch(error =>{
            return error;
        });
}

export {
    getUserList,
    getUser,
    modifyUser,
    removeUser,
}