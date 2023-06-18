<template>
    <div>
        <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <div class="absolute top-0 left-0 h-full w-full bg-darkBlue bg-opacity-80 rounded-xl cursor-pointer z-0"
                @click="$emit('close')"></div>

            <div class="relative md:w-9/12 w-11/12 bg-lighterBlue sm:p-14 p-5 rounded-lg z-10">
                <div class="flex items-start gap-2">
                    <label for="predefined-mail">Send it to customer’s predefined mail</label>
                    <input id="predefined-mail" type="checkbox" class="mt-1" />
                </div>
                <div class="w-full sm:w-11/12 mt-4">
                    <ValidationObserver v-slot="{ handleSubmit }" ref="sendEmail">
                        <form @submit.prevent="handleSubmit(sendInvoice)" class="flex flex-col gap-2">
                            <div class="w-full flex flex-col sm:flex-row sm:items-center">
                                <label for="to" class="w-28">To:</label>
                                <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email"
                                    class="w-full">
                                    <input v-model="emailTo" id="to" type="text" placeholder="Email..." :class="
                                        errors[0]
                                            ? 'border border-red-600 placeholder-red-600'
                                            : 'border border-normalBlue border-opacity-30'
                                    " class="w-full py-2 px-3 bg-white outline-none rounded-lg" />
                                </ValidationProvider>
                            </div>
                            <div class="flex flex-col sm:flex-row sm:items-center">
                                <label for="cc" class="w-28">CC:</label>
                                <input v-model="emailCc" id="cc" type="text" placeholder="Optional"
                                    class="w-full py-2 px-3 bg-white border border-normalBlue border-opacity-30 outline-none rounded-lg" />
                            </div>
                            <div class="flex flex-col sm:flex-row items-start">
                                <label for="subject" class="w-28 mt-2">Subject:</label>
                                <div class="w-full">
                                    <input v-model="emailSubject" id="subject" type="text" placeholder="Subject..."
                                        class="w-full py-2 px-3 bg-white border border-normalBlue border-opacity-30 outline-none rounded-lg" />
                                    <div class="max-h-96 overflow-y-scroll scrollbar-none mt-2">
                                        <textarea name="body" v-model="emailBody"
                                            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae nunc tempus, ultrices morbi fringilla. Leo magnis aliquet."
                                            class="w-full border border-normalBlue border-opacity-30 outline-none rounded-lg sm:px-9 sm:py-5 p-4 h-32"></textarea>
                                    </div>
                                </div>
                            </div>

                            <div class="flex justify-end items-center gap-4 mt-5">
                                <button class="py-2 px-5 bg-blackish text-white rounded-full uppercase text-sm"
                                    @click="$emit('close')">
                                    Cancel
                                </button>
                                <button type="submit"
                                    class="py-2 px-5 bg-normalBlue text-white rounded-full uppercase text-sm">
                                    Send
                                </button>
                            </div>
                        </form>
                    </ValidationObserver>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
    layout: 'dashboard-layout',
    components: {
    },
    props: ['invoiceData'],
    data: () => ({
        emailTo: '',
        emailCc: '',
        emailSubject: '',
        emailBody: '',
    }),
    computed: {
        ...mapGetters({
            GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY"
        }),
    },

    methods: {
        ...mapActions({
            SEND_INVOICE: 'invoice/SEND_INVOICE'
        }),

        sendInvoice() {
            const email = {
                to: [this.emailTo],
                cc: [this.emailCc],
                subject: this.emailSubject,
                body: this.emailBody
            }
            this.SEND_INVOICE({ company_id: this.GET_CURRENT_COMPANY.id, invoice_id: this.invoiceData.id, email: email })
                .then(response => {
                    this.$emit('close')
                    this.$toast.success({
                        title: "Invoice Sent",
                        message: "Invoice Sent Successfully",
                    });
                })
                .catch(error => {
                    this.$toast.error({
                        title: "Error",
                        message: error.message,
                    });
                })
        },
    },
};
</script>
