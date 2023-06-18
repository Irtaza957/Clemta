<template>
<div class="overflow-hidden flex flex-col justify-center items-center">
	<div class="bar">
  <div class="circle"></div>
  </div>
  <div class="text-slate-400 mt-2 tracking-wide">Loading... Please Wait</div>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.bar {
  position: relative;
  height: 5px;
  width: 100%; 
  background: #E6F7FA;
  margin-top: 50px;
}

.circle {
  position: absolute;
  top: 0px;
  height: 5px;
  width: 350px;
  background: #0D659D;
  border-radius: 5%;
  -webkit-animation: move 2s infinite;
}
@-webkit-keyframes move {
  0% {left: 0;}
  50% {left: 100%;}
  75% {left: 100%;}
  100% {right: 100%;}
} 
</style>
