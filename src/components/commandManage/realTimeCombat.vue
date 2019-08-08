<template>
  	<div class="combatReplayPage" v-wechat-title="$route.meta.title">
		<!-- 在此设置中框默认显示状态-->
		<div class="guide-frame" style="display: block; cursor:url('../../static/img/QQ.jpg'),auto">
			<div class="guide-title" style="margin-left: -22px">历史回放</div>
			<div id="landlord" style="position: absolute; z-index: 1000;">
				<div class="message" style="opacity:0"></div>
				<canvas id="live2d" width="500" height="560" class="live2d"></canvas>
				<div class="hide-button">隐藏</div>
			</div>
		</div>
		<scriptLink3></scriptLink3>
		<scriptLink></scriptLink>
		<scriptLink2></scriptLink2>
		<scriptLink4></scriptLink4>
  	</div>
</template>
<script type="text/javascript">
	import { mapGetters } from 'vuex';
	import { mapState } from 'vuex';
	
	export default { //这里需要将模块引出，可在其他地方使用
		components:{
			'scriptLink3': {
				render(createElement) {
					return createElement(
					'script',
						{
							attrs: {
								type: 'text/javascript',
								src: '../../static/lib/live2D/TnT.js',
							},
						},
					)
				}
			},
			'scriptLink': {
				render(createElement) {
					return createElement(
					'script',
						{
							attrs: {
							type: 'text/javascript',
							src: '../../static/lib/live2D/live2d.js',
							},
						},
					)
				}
			},
			'scriptLink2': {
				render(createElement) {
					return createElement(
					'script',
						{
							attrs: {
								type: 'text/javascript',
								src: '../../static/lib/live2D/message.js',
							},
						},
					)
				}
			},
			'scriptLink4': {
				render(createElement) {
					return createElement(
					'script',
						{
							attrs: {
								type: 'text/javascript',
								src: '../../static/lib/live2D/OwO.js',
							},
						},
					)
				}
			}
		},
		data (){ //注意：data即使不需要传数据，也必须return,否则会报错
			return {

			}
		},
		methods:{
			readyLoad(){
				$(function(){
					
				})
				
			}
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
			this.readyLoad();
		},
  	}
</script>

<style type="text/css">
	@import "../../../static/css/common.css"; 
	@import "../../../static/mdui-v0.4.0/css/mdui.min.css";
	@import "../../../static/css/cover.css"; 
	@import "../../../static/css/table-view.css"; 
	@import "../../../static/css/page/realTimeCombat.css"; 
</style>
