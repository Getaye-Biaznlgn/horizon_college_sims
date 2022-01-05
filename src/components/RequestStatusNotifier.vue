<template>
    <p class="text-success" :class="{warning:isNotSucceed}">{{notificationMessage}}</p>
</template>
<script>
export default {
    props:['notificationMessage', 'isNotSucceed']
}
</script>
<style scoped>
.warning{
    color: red !important;
}

</style>