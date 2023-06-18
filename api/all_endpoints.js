export default {
    //NONTIFICATIONS
    NOTIFICATION: '/api/notifications',

    //INVOICES
    CUSTOMER_AUTOCOMPLETE: "/api/companies",
    FILTER_CUSTOMER: "/api/companies",
    ON_NEW_ITEM: "/api/companies",
    CREATE_INVOICE: "/api/companies",
    UPDATE_ITEM: "/api/companies",
    DOWNLOAD_INVOICE: "/api/companies",
    SEND_INVOICE: "/api/companies",
    INVOICE_BRAND: "/api/companies",
    GET_INVOICES: "/api/companies",
    INVOICES_FILTER: "/api/companies",
    GET_INVOICE_BRAND: "/api/companies",

    //BILLING HISTORIES
    BILLING_HISTORIES: '/api/companies',

    //SUBSCRIPTION ENDPOINTS
    SUBSCRIPTION: "/api/packages",
    CHANGE_PLAN: "/api/companies",

    // AUTHENTICATION ENDPOINTS
    REGISTER: "/api/auth/register",
    UPDATE_USER: "/api/user/update",
    UPDATE_BILLING_ADDRESS: "/api/companies",
    USER_ME: "/api/user/me",
    USER_COMPANIES: "/api/user/me/companies",
    CHANGE_PASSWORD: "/api/user/change-password",
    RESET_PASSWORD: "/api/user",
    RESTORE_PASSWORD: "/api/user",

    //CUSTOMER ENDPOINT
    CREATE_CUSTOMER: "/api/companies",
    GET_CUSTOMERS: "/api/companies",
    SEARCH_CUSTOMER: "/api/companies",
    DOWNLOAD_CUSTOMER_INVOICE:"/api/companies",

    // PHONE VERIFICATION
    SEND_PHONE_VERIFICATION_CODE: "/api/verifications/send/phone",
    VERIFY_USER_PHONE: "/api/verifications/verify/phone",

    // CREATE ORDER ENDPOINTS
    FETCH_ORDER: "/api/order/get",
    CREATE_ORDER: "/api/order",
    UPDATE_ORDER: "/api/order",
    GET_PACKAGES: "/api/packages/get",
    GET_ORDER_BY_STATUS: "/api/order/get/awaiting",
    ORDER_DISCOUNT: "/api/order/discount",
    ORDER_CHECKOUT: "/api/order",
    CHOOSE_COMPANY_TYPE: "/api/companies",

    // COMPANY DETAILS
    GET_COMPANY_DETAILS: "/api/companies",
    GET_COMPANY_PAYMENT_METHOD: "api/companies",
    GET_COMPANY_RECENT_BILLING_HISTORY: "api/companies",
    GET_CUSTOMER_PORTAL: "api",
    UPLOAD_PROFILE_AVATAR: "/api",

    //TAXATION
    STATE_TAXATION_HISTORY: "/api/companies",
    CREATE_STATE_TAX: "/api/companies",
    UPDATE_STATE_TAX: "/api/companies",
    GET_STATE_TAX: "/api/companies",
    ADD_PARTNER_DIRECTOR: "/api/companies",
    DELETE_PARTNER_DIRECTOR: "/api/companies",
    FINISH_STATE_TAX: "/api/companies",
    FEDERAL_TAXATION_HISTORY: "/api/companies",
    CREATE_FEDERAL_TAX: "/api/companies",
    UPDATE_FEDERAL_TAX: "/api/companies",
    FINISH_FEDERAL_TAX: "/api/companies",
    GET_FEDERAL_TAX: "/api/companies",
    ADD_EXPENSE: "/api/companies",
    CREATE_TRANSACTION: "/api/companies",
    GET_CATEGORIES: "/api",
    FILTLER_TRANSACTIONS: "/api/companies",
    AUTOCOMPLETE_LABELS: "/api/bk-labels/autocomplete",
    BATCH_LABEL: "/api/companies",
    BATCH_REMOVE: "/api/companies",

    // FILE MANAGER ENDPOINTS`
    GET_DOCUMENTS: "/api/v1/folders",
    CREATE_FOLDER: "/api/v1/folders",
    UPDATE_FOLDER: "/api/v1/folders",
    DELETE_FOLDER: "/api/v1/folders",
    UPLOAD_FILE: "/api/v1/files",
    DOWNLOAD_FILE: "/api/v1/files",
    GET_FILE_INFO: "/api/v1/files",
    DELETE_FILE: "/api/v1/files",
    UPDATE_FILE: "/api/v1/files",
    SEARCH_FILE: "/api/v1",
    GET_RECENT_FILES: "/api/v1",
    MOVE_FILE:"/api/v1/files",

    //SERVICE PROGRESS
    GET_SERVICES: "/api",

    //EMAIL NOTIFICATION
    UPDATE_EMAIL_NOTIFICATION: "/api/companies",
    GET_EMAIL_NOTIFICATION: "/api/companies",
}