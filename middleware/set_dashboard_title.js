export default ({ store, route }) => {
    let routeName = ''
    if (route.name === 'dashboard' && route.path === '/dashboard') {
        routeName = 'Dashboard'
    } else if (route.name === 'dashboard' && route.path === '/dashboard/') {
        routeName = 'Dashboard'
    } else if (route.name === 'dashboard-invoices' && route.path === '/dashboard/invoices') {
        routeName = 'Invoices'
    } else if (route.name === 'dashboard-invoices-create-invoice' && route.path === '/dashboard/invoices/create-invoice') {
        routeName = 'Create Invoice'
    } else if (route.name === 'dashboard-customers' && route.path === '/dashboard/customers') {
        routeName = 'Customers'
    } else if (route.name === 'dashboard-documents' && route.path === '/dashboard/documents') {
        routeName = 'Douments'
    } else if (route.name === 'dashboard-service-progress' && route.path === '/dashboard/service-progress') {
        routeName = 'Service Progress'
    } else if (route.name === 'dashboard-my-company' && route.path === '/dashboard/my-company') {
        routeName = 'My Company'
    } else if (route.name === 'dashboard-taxation-accounting' && route.path === '/dashboard/taxation-accounting') {
        routeName = 'Taxation and Accounting'
    } else if (route.name === 'dashboard-taxation-accounting-federal-tax-filing' && route.path === '/dashboard/taxation-accounting/federal-tax-filing') {
        routeName = 'Federal Tax Filling'
    } else if (route.name === 'dashboard-taxation-accounting-state-tax-filing' && route.path === '/dashboard/taxation-accounting/state-tax-filing') {
        routeName = 'State Tax Filling'
    } else if (route.name === 'dashboard-taxation-accounting-bookkeeping' && route.path === '/dashboard/taxation-accounting/bookkeeping') {
        routeName = 'Bookkeeping'
    } else if (route.name === 'settings' && route.path === '/settings') {
        routeName = 'Settings'
    } else if (route.name === 'settings-billing-history' && route.path === '/settings/billing-history') {
        routeName = 'Billing history'
    }
    store.commit('CHANGE_DASHBOARD_TITLE', routeName)
}
