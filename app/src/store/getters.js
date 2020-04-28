/*
 * @Author: johnwang
 * @since: 2019-11-02 16:21:40
 * @lastTime: 2019-11-02 16:27:10
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
const getters={
    currentUser(state){
        return state.currentUser
    },
    isLogin(state){
        return state.isLogin
    },
    getUsername(state){
        return state.username
    }
}

export default getters