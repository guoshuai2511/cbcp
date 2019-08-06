<template>
    <div class="">
        <div id="allmap" class="allmap" :style="{width: '100%', height: '100%'}">
        </div>
    </div> 
</template>

<script type="text/javascript">
  import $axios from 'axios';
  import { SingleDivOverlayConstructor } from '../../static/lib/SingleDivOverlayConstructor.js';
  let map;
  export default { //这里需要将模块引出，可在其他地方使用
    data (){ //注意：data即使不需要传数据，也必须return,否则会报错
      return {  

      }
    },
    methods:{
      ready() {
        var Bmap = new BMap.Map('allmap',{enableMapClick:false});
        map = Bmap;
        var point = new BMap.Point(107.075796, 34.959684);
        Bmap.centerAndZoom(point, 6);
        Bmap.addControl(new BMap.MapTypeControl());
        Bmap.enableScrollWheelZoom(true);
        Bmap.enableDoubleClickZoom(true);
 
      },
   
    },
    mounted() {
      this.ready();
    },
  }
</script>
