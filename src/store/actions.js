/*
 * @Author: johnwang
 * @since: 2019-11-02 16:21:32
 * @lastTime: 2019-11-02 16:29:33
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
const actions ={
    setUser({commit},user){
        commit("userStatus",user)
    },
    setAdmin({commit},username){
        commit("usernameStatus",username)
    }
}


export default actions;