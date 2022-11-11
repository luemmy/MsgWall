/**
    功能: 搜索框
*/

<script setup>
import { ref, inject } from 'vue'
const api = inject('api')
const emit = defineEmits(['searchVal', 'clickClear'])

const searchVal = ref('')

const clickSearch = () => {
    emit('searchVal', searchVal.value)
}

const clickClear = () => {
    searchVal.value = ''
    emit('clickClear', searchVal.value)
}

</script>

<template>
    <div class="outer">
        <input type="text" placeholder="请输入搜索关键词" v-model="searchVal">
        <button @click="clickSearch()">搜索</button>
        <button @click="clickClear()">清除</button>
    </div>
</template>

<style scoped>
.outer {
    display: flex;
    justify-content: space-between;
    width: 280px;
}
</style>