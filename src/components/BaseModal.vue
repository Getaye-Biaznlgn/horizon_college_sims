<template>
    <div class="modal fade" id="baseModal" tabindex="-1" aria-labelledby="degreeDepartmentLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-body">
         <slot name="modalBody"/>
      </div>
      <div class="d-flex py-2">
         <slot name="modalFooter"/>
      </div>
    </div>
  </div>
</div>
</template>




