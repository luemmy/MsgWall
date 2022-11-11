/**
    功能: 发布按钮
*/

<script setup>
import { inject } from 'vue'
import TextAreaComp from "./commonComp/TextAreaComp.vue"

const props = defineProps(['resultsList'])
const emit = defineEmits(['deleteItem'])

const api = inject('api')

const deleteItem = (id) => {
    emit('deleteItem', id)
}

</script>

<template>
    <text-area-comp v-for="item in props.resultsList" :key="item.post_id" :resultsListItem="item"
        @deleteItem="deleteItem">
    </text-area-comp>
</template>

<style scoped>

</style>