<script setup>
    let props = defineProps(['errorMsg', 'buttonTitle'])

    defineEmits(['retryButtonClicked'])
</script>

<template>
    <div class="ErrorMsg_cls">
        <div style="font-size: 1.5em;">⚠️</div>
        <p>{{ errorMsg }}</p>
        <p><a class="ErrorMsgButton_cls" @click="$emit('retryButtonClicked')">{{ buttonTitle }}</a></p>
    </div>
</template>

<style scoped>
    .ErrorMsg_cls
    {
        background-color: #834655;
        border:             solid 2px #c8b273;
        text-align:         center;
        padding:            10px;
        font-family:        'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        color:            black;
    }

    .ErrorMsgButton_cls
    {
        cursor:             pointer;
        text-decoration:    underline;
        color:            #c8b273;
        user-select:        none;
    }
</style>
