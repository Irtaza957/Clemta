<template >
<div>
    <div v-for="i in 2" :key="i" class="card">
        <div class="header">
            <div class="details">
                <span class="name"></span>
            </div>
        </div>
        <div class="description">
            <div class="line line-1"></div>
            <div class="line line-2"></div>
            <div class="line line-3"></div>
        </div>
    </div>
    </div>
</template>
<style scoped>
header {
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
    top: .5rem;
    text-align: center;
    color: #222;
}

.card {
    width: 100%;
}

.card .header {
    display: flex;
    align-items: center;
}

.details span {
    display: block;
    background: #d9d9d9;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
}

.details .name {
    height: 15px;
    width: 100px;
}

.card .description {
    margin: 25px 0;
}

.description .line {
    background: #d9d9d9;
    border-radius: 10px;
    height: 13px;
    margin: 10px 0;
    overflow: hidden;
    position: relative;
}

.description .line-1 {
    width: calc(100% - 15%);
}

.description .line-3 {
    width: calc(100% - 40%);
}

.details span::before,
.description .line::before {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    background-image: linear-gradient(to right, #d9d9d9 0%, rgba(0, 0, 0, 0.05) 20%, #d9d9d9 40%, #d9d9d9 100%);
    background-repeat: no-repeat;
    background-size: 450px 400px;
    animation: shimmer 1s linear infinite;
}

.details span::before {
    animation-delay: 0.2s;
}

@keyframes shimmer {
    0% {
        background-position: -450px 0;
    }

    100% {
        background-position: 450px 0;
    }
}
</style>