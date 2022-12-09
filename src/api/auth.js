import http from './http.js';
import router from "@/routes";

function setSession(response){
    session.setItem('user',JSON.stringify(response.data.data));
    session.setItem('result',JSON.stringify(response.data));
    http.defaults.headers.common["Authorization"] = `Bearer ${response.data.token.access}`;
}

function auth(data){
    return http.post("/api/auth/", data)
        .then(response => {
            setSession(response);
            return response;
        })
        .catch(error =>{
            return error;
        });
}

function kakaoAuth(route){
    window.Kakao.Auth.login({
        scope: 'account_email',
        success: function() {
            window.Kakao.API.request({
                url: '/v2/user/me',
                success: (kakaoResponse) => {
                    return http.post("/api/auth/kakao/", kakaoResponse)
                        .then(response => {
                            if(response.status==204){
                                router.push("/signup");
                            }else{
                                setSession(response);
                                window.Kakao.Auth.logout();
                                if(!!route.query.redirect && route.query.redirect.replace('/','') != 'signup') {
                                    router.push(route.query.redirect)
                                        .then(()=>{
                                            window.location.reload();
                                        });
                                }else{
                                    router.push("/")
                                        .then(()=>{
                                            window.location.reload();
                                        });
                                }
                            }
                            return response;
                    })
                    .catch(error =>{
                        return error;
                    });
                }
            });
        },
        fail: function(error) {
            console.log(error);
        }
    });
}

function kakaoSignup(route){
    window.Kakao.Auth.login({
        scope: 'account_email',
        success: function() {
            window.Kakao.API.request({
                url: '/v2/user/me',
                success: (kakaoResponse) => {
                    return http.post("/api/signup/kakao/", kakaoResponse)
                        .then(response => {
                            setSession(response);
                            window.Kakao.Auth.logout();
                            if(!!route.query.redirect) {
                                router.push(route.query.redirect)
                                    .then(()=>{
                                        window.location.reload();
                                    });
                            }else{
                                router.push("/")
                                    .then(()=>{
                                        window.location.reload();
                                    });
                            }
                            return response;
                        })
                        .catch(error =>{
                            return error;
                        });
                }
            });
        },
        fail: function(error) {
            console.log(error);
        }
    });
}

function logout(){
    if(!!session.getItem('user')) http.get("/api/logout/", {});
    session.removeItem('user');
    session.removeItem('result');
    delete http.defaults.headers.common["Authorization"];
}

/*function verify(data){
    return http.post("/api/token/verify/", data)
        .then(response => {
            console.log(response);
            return response;
        })
        .catch(error =>{
            return error;
        });
}*/

/**
 * Check Expired Token
return boolean
 true : session expired
 false : session not expired
**/
function checkExpired(){
    const expired = session.getItem('result');
    if(!!expired && expired != "undefined"){
        const expiredInfo = JSON.parse(expired);
        const toDate = new Date();
        const accessDate = new Date(expiredInfo.expired.access);

        return toDate>accessDate?true:false;
    }else{
        return true;
    }
}
export {
    auth,
    logout,
    checkExpired,
    kakaoAuth,
    kakaoSignup,
}