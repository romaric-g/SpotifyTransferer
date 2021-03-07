<template>
    <div v-if="state.open">
        <div class="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 flex justify-center items-center">
            <div class="w-full max-w-xl bg-white py-10 text-center">
                <p class="text-xl font-semibold">Transfert en cours</p>
                <p class="text-base">Etape {{state.current.number}}/{{state.max}}</p>
                <p class="mt-4 mb-2">{{state.names[state.current.number]}}</p>
                <div class="p-bar">
                    <span class="bg-green" :style="{width: `${state.current.progress}%`}"></span>
                </div>
                <button class="bg-transparent text-gray font-semibold hover:text-green py-2 px-4 border-none focus:outline-none">
                    Annuler
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["state"]
}
</script>

<style>
.p-bar {
    @apply w-2/3 h-1 bg-gray-200 relative mx-auto;
}

.p-bar span {
    display: block;
    height: 100%;
    border-radius: 5px;
}
</style>