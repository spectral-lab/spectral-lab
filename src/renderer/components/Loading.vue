<template>
  <div class="modal-container">
    <div class="modal-header">
      <slot name="header">
        <h2 class="modal-header">Peak Extraction</h2>
      </slot>
    </div>
    <div class="modal-body">
      <p class="modal-header">Detecting feature lines...</p>
      <div class="progress-bar blue stripes">
        <span style="width: 100%"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-container {
  width: 300px;
  height: 200px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: rgba(42, 42, 51, 0.9);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(212, 175, 175, 0.05);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  font-weight: lighter;
}
.modal-body {
  height: 50%;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.progress-bar {
    height: 10px;
    padding: 5px;
    width: 180px;
    border-radius: 1px;
}

.progress-bar span {
  display: inline-block;
  height: 100%;
  border-radius: 3px;
  transition: width .4s ease-in-out;    
}

.blue span {
    background-color: #34c2e3;   
}

.stripes span {
    background-size: 30px 30px;
    background-image: linear-gradient(135deg, rgba(255, 255, 255, .15) 25%, transparent 25%,
                        transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%,
                        transparent 75%, transparent);            
    
    animation: animate-stripes 1.5s linear infinite;             
}

@keyframes animate-stripes {
    0% {background-position: 0 0;} 100% {background-position: 60px 0;}
}
</style>
