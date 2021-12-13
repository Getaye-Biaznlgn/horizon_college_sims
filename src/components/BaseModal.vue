<template>
    <div class="modal fade" id="baseModal" tabindex="-1" data-bs-backdrop="static" aria-labelledby="degreeDepartmentLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-body">
         <slot name="modalBody"/>
      </div>
          <div class="d-flex py-2">
          <button @click="cancel" :disabled="isError" type="button" class="btn btn-sm btn-cancel border border-secondary ms-auto"  data-bs-dismiss="modal">CANCEL</button>
          <div v-if="btnType === 'add'">
          <button :disabled="isError" type="button" @click="save" class="btn btn-sm px-4 btn-save text-white mx-3">
            <span v-if="isLoadingTrue">
               <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
               SAVING
            </span>      
            <span v-else>SAVE</span>   
          </button>
          </div>
          <div v-else >
           <button :disabled="isError" type="button" @click="edit" class="btn btn-sm px-4 btn-save text-white mx-3">
            <span v-if="isLoadingTrue">
               <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
               EDITING
            </span>      
            <span v-else>EDIT</span>   
          </button>
          </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props:['isError','btnType'],
  data() {
    return {
      
    }
  },
  computed:{
     isLoadingTrue(){
       return this.$store.getters['dean/isLoading']
     },
  },
  methods: {
    save(){
      this.$emit('save')
    },
    edit(){
      this.$emit('edit')
      
    },
    cancel(){
      this.$emit('empty')
    }
  },
}
</script>
<style scoped>  
.btn-save{
    background-color: #ff9500;
    border-radius: 0;
}
.btn-save:hover{
  background-color: #eca643;
}
.btn-cancel{
  border-radius: 0;  
}
</style>




