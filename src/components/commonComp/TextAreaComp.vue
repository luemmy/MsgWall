/**
    功能: 文本输入框
*/

<script setup>
import { ref, inject } from 'vue'
import { alertInstance } from '@/plugIns/alert.js'
const api = inject('api')

const props = defineProps(['resultsListItem'])
const emit = defineEmits(['deleteItem', 'confirmPublish'])

const item = ref(props.resultsListItem ?? { content: '' })

const textareaVal = ref('')
const itemContent = ref(item.value.content)

const isShowTextarea = ref(false)
const isShowContent = ref(true)
const isShowTime = ref(true)
const isShowBtns = ref(false)
const isEditBtnDisable = ref(false)
const editBtnText = ref('编辑')
const deleteBtnText = ref('删除')

const clickEditOrConfirm = () => {
    if (editBtnText.value === '编辑') { clickEdit() }
    else if (editBtnText.value === '确认') { clickConfirm() }
    else if (editBtnText.value === '发布') { clickPublish() }
}
const clickDeleteOrCancel = () => {
    deleteBtnText.value === '删除' ? clickDelete() : clickCancel()
}

const clickPublish = async () => {
    if (textareaVal.value.length < 5) {
        alertInstance.alertWarning('输入内容不能少于5个字符')
        return
    } else {
        const res = await api.publishPost({ content: textareaVal.value })
        if (res.post_id.length !== 0) {
            emit('confirmPublish')
            alertInstance.alertSuccess('发布成功')
        }
    }
}

const clickEdit = () => {
    isShowTextarea.value = true
    isShowContent.value = false
    editBtnText.value = '确认'
    deleteBtnText.value = '取消'
    textareaVal.value = item.value.content
    isEditBtnDisable.value = true
}

const clickDelete = async () => {
    const res = await api.deletePost(item.value.post_id, { content: textareaVal.value })
    if (res === null) {
        alertInstance.alertError('删除成功')
        emit('deleteItem', item.value.post_id)
    }
}
const clickConfirm = async () => {
    const res = await api.editPost(item.value.post_id, { content: textareaVal.value })
    if (res === null) {
        isShowTextarea.value = false
        isShowContent.value = true
        editBtnText.value = '编辑'
        deleteBtnText.value = '删除'
        item.value.content = textareaVal.value
        isShowBtns.value = false
        alertInstance.alertSuccess('确认修改成功')
    }
}
const clickCancel = () => {
    item.value.content = itemContent.value
    isShowTextarea.value = false
    isShowContent.value = true
    editBtnText.value = '编辑'
    deleteBtnText.value = '删除'
    isShowTime.value = true
    alertInstance.alertInfo('已取消')
}

const goPublish = () => {
    isShowTextarea.value = true
    isShowContent.value = false
    isShowBtns.value = true
    editBtnText.value = '发布'
    deleteBtnText.value = '取消'
    isShowTime.value = false
    textareaVal.value = ''
}

const formatTime = (timestamp) => {
    // 时间戳转成时间
    const time = new Date(timestamp * 1000)
    return `${time.getFullYear()}-${fillZero(
        time.getMonth() + 1
    )}-${time.getDate()} ${fillZero(time.getHours())}:${fillZero(
        time.getMinutes()
    )}`
}

const fillZero = (n) => {
    return n < 10 ? `0${n}` : n
}

const init = () => {
    if (editBtnText.value === '编辑') {
        isShowBtns.value = false
    } else {
        isShowBtns.value = true
    }
}
init()

const handleMouseEvent = (e) => {
    if (editBtnText.value !== '编辑') return
    if (e === 'in') {
        isShowBtns.value = true
    }
    if (e === 'out') {
        isShowBtns.value = false
    }
}

defineExpose({
    goPublish
})
</script>

<template>
    <div class="container">
        <textarea v-if="isShowTextarea" placeholder="请输入消息" v-model="textareaVal"></textarea>
        <div v-if="isShowContent" class="content">{{ item.content }}</div>
        <div class="selectShow">
            <div v-if="isShowTime" class="date">{{ formatTime(item.publish_time) }}</div>
            <div class="btn-box" @mouseover="handleMouseEvent('in')" @mouseout="handleMouseEvent('out')">
                <button v-show="isShowBtns" :disabled="isEditBtnDisable" class="editBtn"
                    @click="clickEditOrConfirm()">{{ editBtnText }}</button>
                <button v-show="isShowBtns" class="deleteBtn" @click="clickDeleteOrCancel()">{{ deleteBtnText
                }}</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    background-color: #0F0F0F;
    border-radius: 12px;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
}

textarea {
    width: 410px;
    height: 80px;
    border-radius: 8px;
    margin: 0 auto;
    background-color: #AAA;
    padding: 10px;
}

.content {
    color: #aaa;
}

.selectShow {
    margin: 20px auto 0;
    width: 410px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.date {
    color: #aaa;
    font-size: 12px;
}

.btn-box {
    width: 260px;
    height: 30px;
    text-align: right;
}

.btn-box button {
    width: 50px;
    height: 30px;
    margin-left: 10px;
    border-radius: 30px;
    color: #eee;
    font-weight: bold;
    cursor: pointer;
}

.editBtn {
    background-color: teal;
}

.deleteBtn {
    background-color: #810101;
}
</style>