<template>
    <section>
        <div class="flex justify-between">
            <div></div>
            <div class="m-3 flex items-center gap-6">
                <div class="flex justify-center items-center gap-4 cursor-pointer"
                    :class="num_page === 1 ? 'pointer-events-none' : 'pointer-events-auto'">
                    <div @click="$emit('changePage', 0)" class="flex justify-center items-center w-10 h-10 rounded-full"
                        :class="num_page === 1 ? 'bg-gray-100' : 'bg-white'">
                        <img src="@/assets/img/pages/dashboard/billing/Vector-left.png" />
                        <img src="@/assets/img/pages/dashboard/billing/Vector-left.png" />
                        <img src="@/assets/img/pages/dashboard/billing/Vector-left.png" />
                    </div>
                    <div @click="$emit('changePage', -1)"
                        class="flex justify-center items-center bg-white w-10 h-10 rounded-full"
                        :class="num_page === 1 ? 'bg-gray-100' : 'bg-white'">
                        <img src="@/assets/img/pages/dashboard/billing/Vector-left.png" />
                    </div>
                </div>
                <div class="text-darkBlue">{{ num_page }} of {{ total_pages }}</div>
                <div class="flex items-center gap-4 cursor-pointer"
                    :class="num_page === total_pages ? 'pointer-events-none' : 'pointer-events-auto'">
                    <div @click="$emit('changePage', 1)"
                        class="flex justify-center items-center  w-10 h-10 rounded-full"
                        :class="num_page === total_pages ? 'bg-gray-100' : 'bg-white'">
                        <img src="@/assets/img/pages/dashboard/billing/Vector-right.png" />
                    </div>
                    <div @click="$emit('changePage', total_pages)"
                        class="flex justify-center items-center w-10 h-10 rounded-full"
                        :class="num_page === total_pages ? 'bg-gray-100' : 'bg-white'">
                        <img src="@/assets/img/pages/dashboard/billing/Vector-right.png" />
                        <img src="@/assets/img/pages/dashboard/billing/Vector-right.png" />
                        <img src="@/assets/img/pages/dashboard/billing/Vector-right.png" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        total_pages: {
            type: Number,
            default: () => 0
        },
        num_page: {
            type: Number,
            default: () => 0
        }
    },
}
</script>
