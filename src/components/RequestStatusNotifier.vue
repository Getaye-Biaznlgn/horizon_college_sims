<template>
    <p :class="{warning:isNotSucceed}">{{notificationMessage}}</p>
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
p{
    color: darkgreen;
}
</style>