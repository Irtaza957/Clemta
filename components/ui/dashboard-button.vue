<template>
    <button :type="type" :disabled="loading" :class="classes" class="bg-blackish text-white rounded-full"
        @click="$emit('click')">
        <span v-if="!loading" :class="fontSize">{{ title }}</span>
        <span v-if="loading" :class="fontSize" class="flex">
            <svg class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
            </svg>
            Processing
        </span>
    </button>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: () => ''
        },
        loading: {
            type: Boolean,
            default: () => false
        },
        type: {
            type: String,
            default: () => 'button'
        },
        classes: {
            type: String,
            default: () => ''
        },
        fontSize: {
            type: String,
            default: () => 'text-sm'
        },
    }
}
</script>
