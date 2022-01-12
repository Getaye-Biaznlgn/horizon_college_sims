<template>
    <tr>
        <td >3</td>
        <td v-text="col2"></td>
        <td v-text="col3"></td>
        <td v-text="col4"></td>
        <td v-text="col5"></td>
        <td v-text="col6"></td>
        <td v-text="col7"></td>
        <td>
            <slot name="option"/>
        </td>
    </tr>
</template>
<script>
export default {
    props:['col1','col2','col3','col4','col5', 'col6','col7']
}
</script>
<style scoped>
td{
  text-align: left;
  padding: 8px;
  vertical-align: top;
}
</style>