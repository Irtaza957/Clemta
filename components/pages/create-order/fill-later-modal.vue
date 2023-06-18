<template>
    <div class="fixed top-0 left-0 h-full w-full flex justify-center items-center z-20">
        <div class="fixed top-0 left-0 h-full w-full bg-darkBlue bg-opacity-60 cursor-pointer z-10"
            @click="$emit('close')"></div>
        <div class="skip-modal relative flex flex-col items-center gap-6 bg-white rounded-xl px-9 py-12 z-20">
            <div class="absolute top-4 right-6 text-sm font-semibold cursor-pointer" @click="$emit('close')">
                &#9587;
            </div>
            <h1 class="text-2xl font-semibold sm:w-3/4 w-full text-center">
                Are you sure you want to skip these steps?
            </h1>
            <p class="text-sm sm:w-2/3 w-full text-center">
                To complete it you should go to Company > Service Progress
            </p>
            <div class="flex items-center gap-4">
                <button class="text-xs sm:text-sm w-28 sm:w-36 py-2 rounded-full bg-normalBlue text-white uppercase"
                    @click="$emit('close')">
                    Go back
                </button>
                <nuxt-link to='/dashboard' class="text-xs sm:text-sm w-28 sm:w-36 py-2 rounded-full bg-blackish text-white uppercase text-center">
                    Fill later
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.skip-modal {
    width: 92%;
    max-width: 520px;
    animation: popup 0.3s ease-in-out;
}

@keyframes popup {
    0% {
        opacity: 0;
        transform: scale(1.2);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}
</style>