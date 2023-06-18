import Vue from 'vue'
import CxltToastr from 'cxlt-vue2-toastr'
var toastrConfigs = {
    position: 'top right',
    showDuration: 2000,
    timeOut: 5000
}
Vue.use(CxltToastr, toastrConfigs)
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'