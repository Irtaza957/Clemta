<template>
    <DashboardCard>
        <div class="flex flex-col sm:flex-row justify-between sm:justify-start items-center sm:h-10">
            <div class="w-full sm:flex sm:gap-8 sm:items-center lg:gap-12">
                <div>
                    <h1 class="text-sm uppercase font-semibold">Email Notification</h1>
                </div>
                <div class="flex flex-col sm:flex-row sm:gap-6 mt-4 sm:mt-0">
                    <div>
                        <input v-model="email.essential_email" type="checkbox" value="essentialEmail"
                            id="essentialEmail">
                        <label class="text-base font-semibold" for="essentialEmail">
                            Essential mails
                        </label>
                    </div>
                    <div>
                        <input v-model="email.marketing_email" type="checkbox" value="marketingEmail" id="marketingEmail">
                        <label class="text-base font-semibold" for="marketingEmail">
                            Marketing mails
                        </label>
                    </div>
                </div>
            </div>
            <div class="mt-4 sm:mt-0 w-full sm:w-auto flex">
                <button @click="updateEmaiNotification" class="text-xs w-36 h-10 rounded-full bg-normalBlue text-white uppercase">
                    Save Changes
                </button>
            </div>
        </div>
    </DashboardCard>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data: () => ({
        email: {}
    }),
    created(){
        this.getEmailNotifications()
    },
    methods: {
           ...mapActions({
            UPDATE_EMAIL_NOTIFICATION: 'settings/UPDATE_EMAIL_NOTIFICATION',
            GET_EMAIL_NOTIFICATION: 'settings/GET_EMAIL_NOTIFICATION',
        }),

        getEmailNotifications(){
            this.GET_EMAIL_NOTIFICATION()
            .then(response=>{
                this.email={...response.data.notification}                
            })           
        },

        updateEmaiNotification() {
            this.UPDATE_EMAIL_NOTIFICATION(this.email)
            .then(response=>{
                this.$toast.success({
                    title: "Email Notification",
                    message: "Email notification updated successfully",
                });
            })
            .catch(error=>{
                this.$toast.success({
                title: "Error",
                message: error.message,
                });
            })
        }
    }
}
</script>

<style lang="scss" scoped>
input[type=checkbox]+label {
    display: block;
    margin: 0;
    cursor: pointer;
    padding: 0.2em;
}

input[type=checkbox] {
    display: none;
}

input[type=checkbox]+label:before {
    content: "\2714";
    border: 1px solid rgba(46, 59, 60, 0.4);
    margin-right: 0.2em;
    vertical-align: top;
    color: transparent;
    transition: .2s;
}

input[type=checkbox]:checked+label:before {
    display: inline;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-color: gray;
    color: #0D659D;
}
</style>