import http from './http.js';

function getQuotationList(){
    return http.get("/api/quotation/list", {});
}

function getQuotationMyList(data){
    return http.get("/api/quotation/mylist/?user_id="+data, {});
}

function addQuotation(data){
    return http.post("/api/quotation/add/", data)
        .then(response => {
            return response;
        })
        .catch(error =>{
            return error;
        });
}

function modifyQuotation(data){
    return http.post("/api/quotation/modify/", data)
        .then(response => {
            return response;
        })
        .catch(error =>{
            return error;
        });
}

function removeQuotation(data){
    return http.post("/api/quotation/remove/", data)
        .then(response => {
            return response;
        })
        .catch(error =>{
            return error;
        });
}

export {
    getQuotationList,
    getQuotationMyList,
    addQuotation,
    modifyQuotation,
    removeQuotation,
}