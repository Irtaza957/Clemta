<template>
    <dashboard-modal :maxWidth="'max-w-md'" @close="$emit('close')">
        <ValidationObserver v-slot="{ handleSubmit }" ref="newCustomerDetails">
            <form @submit.prevent="handleSubmit(onSubmit)" class="text-sm ">
                <div>
                    <ValidationProvider v-slot="{ errors }" name="message" rules="required">
                        <textarea v-model="message" type="text" name="message" placeholder="Your Message..." :class="
                            errors[0] ? 'border border-red-600 ' : 'border'
                        " class="w-full py-2.5 px-3 rounded-lg focus:outline-none" />
                    </ValidationProvider>
                </div>
                <div class="flex justify-center items-center flex-wrap gap-3 mt-6">
                    <button class="text-sm rounded-full text-white bg-normalBlue uppercase w-28 sm:w-36 py-2"
                        @click="$emit('close')">
                        Cancel
                    </button>
                    <button type="submit"
                        class="text-sm bg-blackish text-white rounded-full uppercase w-28 sm:w-36 py-2">
                        Submit
                    </button>
                </div>
            </form>
        </ValidationObserver>
    </dashboard-modal>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props:{
        step:{
            type: Number,
            default: () => null
        }
    },
    data: () => ({
        message: '',
    }),
    methods: {
        ...mapActions({
            CHOOSE_COMPANY_TYPE: 'createOrder/CHOOSE_COMPANY_TYPE'
        }),

        onSubmit() {            
            let status
            if(this.step===1){
                status='company'
            }
            else if(this.step===2){
                status='state'    
            }            
            else{
                status='company'
            }
            this.CHOOSE_COMPANY_TYPE({message: this.message, type: status})
                .then(response => {
                    this.$emit('close')
                    this.message = ''
                    this.$toast.success({
                        title: "Message Sent",
                        message: "Message Sent Successfully",
                    });
                })
                .catch(error => {
                    this.$toast.error({
                        title: "Error",
                        message: error.message,
                    });
                })
        }
    }
}
</script>