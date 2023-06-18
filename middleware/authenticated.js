export default ({ redirect, $auth, store, route }) => {
    if (!$auth.loggedIn) {
        return redirect('/login')
    } else if (!store.getters['authentication/GET_CURRENT_COMPANY']) {
        if (route.name !== 'dashboard' && route.path !== '/dashboard') {
            return redirect('/dashboard')
        }
    }
}
