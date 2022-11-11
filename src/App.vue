<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import SearchComp from "./components/SearchComp.vue"
import ContentComp from "./components/ContentComp.vue"
import TextAreaComp from "./components/commonComp/TextAreaComp.vue"

const api = inject('api')

const resultsList = ref([])
const isShowEditBox = ref(false)
const getPage = ref(1)
const getLimit = ref(5)
const isLoading = ref(false) // 是否正在加载
const isFinished = ref(false) // 是否加载完成

const myTextareaComp = ref(null)

const resultsData = async (flag = false) => {
    if (isLoading.value || isFinished.value) return
    isLoading.value = true
    const { results, amount } = await api.getPosts({
        page: getPage.value,
        limit: getLimit.value
    })
    isLoading.value = false
    if (flag) {
        resultsList.value = results
        getPage.value = 2
    } else {
        getPage.value++
        resultsList.value = [...resultsList.value, ...results]
    }

    if (amount === resultsList.value.length) {
        isFinished.value = true
    }
}

const myGetPosts = async () => {
    resultsData()
}

const isScroll = () => {
    return (
        document.documentElement.clientHeight != document.documentElement.scrollHeight
    )
}

const onscroll = () => {
    const bottomOfWindowHeight = document.documentElement.offsetHeight -
        (document.documentElement.scrollTop + document.documentElement.clientHeight)
    if (bottomOfWindowHeight < 100) {
        myGetPosts()
    }
}

onMounted(() => {
    window.addEventListener('scroll', onscroll)
})
onUnmounted(() => {
    window.removeEventListener('scroll', onscroll)
})

const goPublish = () => {
    document.documentElement.scrollTop = 0 // 点击发布回到顶部
    isShowEditBox.value = true
    myTextareaComp.value?.goPublish()
}

const clickSearch = (searchVal) => {
    const filterItems = resultsList.value.filter(item => item.content.includes(searchVal))
    console.log('filterItems', filterItems)
    resultsList.value = filterItems
}
const clickClear = (searchVal) => {
    if (searchVal.length === 0) { resultsData() }
}

const confirmPublish = () => {
    isShowEditBox.value = false
    console.log('执行了, confirmPublish')
    isFinished.value = false
    getPage.value = 1
    resultsData(true)
}

const deleteItem = (id) => {
    resultsList.value.forEach((element, index) => {
        if (element.post_id === id) {
            resultsList.value.splice(index, 1)
        }
    })
}

resultsData()
</script>

<template>
    <div class="containerFluid">
        <div class="container">
            <h1>三眼鸭的消息墙</h1>
            <header>
                <search-comp @searchVal="clickSearch" @clickClear="clickClear"></search-comp>
            </header>
            <main>
                <div v-if="resultsList.length === 0" class="noNews">什么消息都没有~</div>

                <div v-show="isShowEditBox">
                    <text-area-comp ref="myTextareaComp" @confirmPublish="confirmPublish"></text-area-comp>
                </div>

                <div v-if="resultsList.length !== 0">
                    <ContentComp @deleteItem="deleteItem" :resultsList="resultsList"></ContentComp>
                </div>
                <div v-if="resultsList.length !== 0 && isFinished === false" class="noNews">下滑加载更多消息~</div>
                <div v-if="isFinished === true" class="noNews">没有更多消息了~</div>
            </main>
        </div>
        <footer>
            <div @click="goPublish()" class="publishBtn">发布</div>
        </footer>
    </div>
</template>

<style scoped>
.containerFluid {
    width: 100%;
}

footer {
    position: fixed;
    right: 30px;
    bottom: 30px;
}

.container {
    width: 450px;
    margin: 0 auto;
}

h1 {
    color: #eee;
}

header {
    margin: 20px 0;
}

.noNews {
    color: #aaa;
    text-align: center;
    line-height: 150px;
    font-size: 20px;
    padding: 50px 0;
}

/* 发布按钮 */

.publishBtn {
    font-size: 18px;
    font-weight: bold;
    width: 60px;
    height: 60px;
    background-color: teal;
    color: #eee;
    text-align: center;
    line-height: 60px;
    border-radius: 50%;
}

.publishBtn:hover {
    cursor: pointer;
}
</style>
