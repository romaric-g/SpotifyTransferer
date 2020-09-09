<template>
    <div class="flex items-center px-4 py-3" :class="dark ? 'darkrow' : ''">
        <input type="checkbox" :disabled="disabled" class="form-checkbox text-green mr-4" v-model="item.checked"/>
        <p class="text-base mx-4 flex-1">{{item.name}}</p>
    </div>
</template>

<script>
export default {
    props: ["item","disabled","dark"],
    watch: {
        item() {
            console.log("EMIT INPUT")
            this.$emit('input', this.item);
        }
    }
}
</script>

<style>
.darkrow {
    background-color: rgba(0, 0, 0, 0.02);
}
</style>