<template>
    <div class="baseDialog">
    <slot/>
    </div>
</template>
<style scoped>
.baseDialog{
    width: 100%;
    min-height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgb(132, 161, 165);
}
</style>