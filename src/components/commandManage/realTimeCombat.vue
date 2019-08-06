<template>
  	<div class="combatReplayPage" v-wechat-title="$route.meta.title">
		<!-- 在此设置中框默认显示状态-->
		<div class="guide-frame" style="display: block">
			<div class="guide-title" style="margin-left: -22px">历史回放</div>
			<h1 style="color:#fff;" :title="count">{{count}}</h1>
			<input type="text" class="in_l">
		</div>
  	</div>
</template>
<script type="text/javascript">
	import { mapGetters } from 'vuex';
	import { mapState } from 'vuex';
	
	export default { //这里需要将模块引出，可在其他地方使用
		components:{
			
		},
		data (){ //注意：data即使不需要传数据，也必须return,否则会报错
			return {

			}
		},
		methods:{
			/* 
			getSumPrice(){
				let value = 0;
				$(document).on('blur','.in_l',function(){
					//获取当前的按键的值
					value = $('.in_l').val();
				})
				//通过commit提交一个名为increment的mutation
				this.$store.commit("increment", value);
			} */
		},
		/* computed: mapState([
			// 映射 this.shopList为 store.state.shopList
			'shopList'
		]), */
		computed:{
			//映射 this.shopList为 store.state.shopList
			...mapState([
				'shopList'
			]),
			...mapGetters([
				'shopid2'
			]),
			count(){
				return this.$store.state.count;
			},
			
		},
		mounted() {
			const getters = {
				// 获取id为2的商品
				shopid2(state){
					return state.shopList.find((el)=>{
						return el.id == 2;    
					});
				}
			};
			
		},
  	}
</script>

<style type="text/css">
	@import "../../../static/css/common.css"; 
	@import "../../../static/mdui-v0.4.0/css/mdui.min.css";
	@import "../../../static/css/cover.css"; 
	@import "../../../static/css/table-view.css"; 
	@import "../../../static/css/page/combatReplay.css"; 
</style>
