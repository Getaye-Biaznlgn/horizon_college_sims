<template>
<div class="modal  fade" :id="id" tabindex="-1" data-bs-backdrop="static" aria-labelledby="degreeDepartmentLabel" aria-hidden="true">
  <div class="modal-dialog  modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-body">
         <slot name="modalBody"/>
      </div>
          <div class="d-flex  pb-4">
          <button :disabled="isLoading" type="button" @click="cancel" class="btn  mx-3 btn-cancel border border-secondary ms-auto"  data-bs-dismiss="modal">CANCEL</button>
          <button v-if="buttonType==='add'" :disabled="isLoading" type="button" @click="save" class="btn  px-4 btn-save text-white mx-3">
            <span v-if="isLoading">
               <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                 SAVING
               </span>      
            <span v-else>SAVE</span>   
          </button>
          <button v-if="buttonType==='edit'" :disabled="isLoading" type="button" @click="edit" class="btn  px-4 btn-save text-white mx-3">
            <span v-if="isLoading">
               <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
               EDITING
            </span>      
            <span v-else>EDIT</span>   
          </button>
           <button v-if="buttonType==='assign'" :disabled="isLoading" type="button" @click="assign" class="btn  px-4 btn-save text-white mx-3">
            <span v-if="isLoading">
               <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
               SAVING
            </span>      
            <span v-else>Assign</span>   
          </button>
          <button v-if="buttonType==='delete'" :disabled="isLoading" type="button" @click="deleteItem" class="btn  px-4 btn-save text-white mx-3">
            <span v-if="isLoading">
               <span   class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
               DELETING
            </span>      
            <span v-else>OK</span>   
          </button>
         
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props:['isLoading','id','buttonType'],
  data() {
    return {
      
    }
  },
  methods: {
    save(){
      this.$emit('save')
    },
    showDetail(){
      this.$emit('detail')
    },
    edit(){
      this.$emit('edit')
    },
    assign(){
      this.$emit('assign')
    },
    cancel(){
      this.$emit('cancel')
    },
    deleteItem(){
      this.$emit('deleteItem')
    },
  },
}
</script>
<style scoped>  
.btn-save{
    background-color: #2f4587;
    border-radius: 0;
}
.btn-save:hover{
  background-color: #425fb8;
}
.btn-cancel{
  border-radius: 0;  
}


</style>




