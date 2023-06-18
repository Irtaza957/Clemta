<template>
    <div class="fixed top-0 left-0 h-full w-screen overflow-y-scroll flex justify-center items-center z-20">
        <div class="fixed top-0 left-0 h-full w-screen bg-darkBlue bg-opacity-60 cursor-pointer" @click="$emit('close')" />
        <div class="popup-animation relative w-full bg-white rounded-xl px-14 pb-14 pt-20 max-h-full overflow-y-scroll scrollbar-none"
            :class="maxWidth">
            <div class="absolute top-7 right-7 w-5 h-5 text-darkBlue font-semibold cursor-pointer" @click="$emit('close')">
                &#9587;</div>
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        maxWidth: {
            type: String,
            default: () => 'max-w-2xl'
        }
    }
}
</script>
