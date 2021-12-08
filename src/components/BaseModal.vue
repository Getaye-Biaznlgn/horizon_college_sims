<template>
    <div class="modal fade" id="baseModal" tabindex="-1" aria-labelledby="degreeDepartmentLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-body">
         <slot name="modalBody"/>
      </div>
         <div class="d-flex justify-content-between mt-3 mb-3">
             <button type="button" class="btn commenbtn btn-cancel border border-secondary ms-5"  data-bs-dismiss="modal">CANCEL</button> 
           <button type="button" class="btn commenbtn me-5" @click="save()">
           <div v-if="isLoading" class="spinner-border text-primary" role="status"></div>  
           <span v-else>SAVE</span> 
           </button>      
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props:['isLoading'],
  data() {
    return {
      
    }
  },
  methods: {
    save(){
      this.$emit('save')
    }
  },
}
</script>
<style scoped>
.commenbtn{
  background-color: #ff9500;
    color: #fff;
    width: 7em;  
}
.commenbtn:hover{
  background-color: #eca643;
}
</style>




