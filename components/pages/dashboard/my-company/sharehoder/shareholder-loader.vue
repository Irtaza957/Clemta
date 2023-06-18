<template>
    <div class="w-full px-4 mt-3">
        <div class="skeleton p-4 w-full mb-5 rounded-md flex bg-white">
            <div class="pr-4 flex-1">
                <div class="mt-3 h-24 rounded-md square"></div>
                <div class="mt-3 h-24 rounded-md square"></div>
                <div class="mt-3 h-24 rounded-md square"></div>
                <div class="mt-3 h-24 rounded-md square"></div>
            </div>
            <div class="px-10 pt-4 flex-2">
                <div class="h-12 mb-2 rounded-md  w-3/4 line"></div>
                <div class="h-8 mb-2 rounded-md line mt-5"></div>
                <div class="mb-2 rounded-md h-12 w-3/6 line mt-5"></div>
                <div class="h-8 mb-2 rounded-md  w-3/4 line mt-5"></div>
                <div class="mb-2 rounded-md h-12 w-3/6 line mt-5"></div>
                <div class="h-8 mb-2 rounded-md  w-3/4 line mt-5"></div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.skeleton {
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, .14), 0 3px 3px -2px rgba(0, 0, 0, .2), 0 1px 8px 0 rgba(0, 0, 0, .12);
}

.skeleton .square {
    background: rgba(130, 130, 130, 0.2);
    background: -webkit-gradient(linear, left top, right top, color-stop(8%, rgba(130, 130, 130, 0.2)), color-stop(18%, rgba(130, 130, 130, 0.3)), color-stop(33%, rgba(130, 130, 130, 0.2)));
    background: linear-gradient(to right, rgba(130, 130, 130, 0.2) 8%, rgba(130, 130, 130, 0.3) 18%, rgba(130, 130, 130, 0.2) 33%);
    background-size: 800px 100px;
    animation: wave-squares 2s infinite ease-out;
}

.skeleton .line {
    background: rgba(130, 130, 130, 0.2);
    background: -webkit-gradient(linear, left top, right top, color-stop(8%, rgba(130, 130, 130, 0.2)), color-stop(18%, rgba(130, 130, 130, 0.3)), color-stop(33%, rgba(130, 130, 130, 0.2)));
    background: linear-gradient(to right, rgba(130, 130, 130, 0.2) 8%, rgba(130, 130, 130, 0.3) 18%, rgba(130, 130, 130, 0.2) 33%);
    background-size: 800px 100px;
    animation: wave-lines 2s infinite ease-out;
}

.flex-2 {
    flex: 2;
}

@keyframes wave-lines {
    0% {
        background-position: -468px 0;
    }

    100% {
        background-position: 468px 0;
    }
}

@keyframes wave-squares {
    0% {
        background-position: -468px 0;
    }

    100% {
        background-position: 468px 0;
    }
}
</style>