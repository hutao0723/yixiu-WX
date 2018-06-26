<template>
	<div class="range" @mousemove.stop()="mouseMove($event)"  @mouseup.stop()="mouseUp" @mouseleave.stop()="mouseUp">
		<!-- <span class="span-left" v-show="type === 'progress'">{{timerFomart(musicCurrentTime)}}</span> -->
		<i class="rangeicon icon-volume-medium" v-show="type === 'volume'"></i>
		<div class="duration" ref="duration" @click.stop="setCurrentProgress($event)">
			<span class="currentProgress" :style="progressWidth" ref="currentProgress" ></span>
			<span class="ball" ref="ball" :style="progressBall" @mousedown.stop()="mouseDown" @touchstart.stop()="mouseDown" @touchmove.stop()="touchMove($event)" @touchend.stop()="touchEnd($event)" ></span>
		</div>
		<!-- <span class="span-right" v-show="type === 'progress'">{{timerFomart(musicDuration)}}</span> -->
	</div>
</template>

<script>
let canDrag = false
let persentWidth = 0
export default {
	data () {
		return {
			type: '',
			currentcolor: '',
			ballwidth: '',
			currenttime: 0,
			volume: 0.9
		}
	},
	props: {
		// progress 和 volume  一个是显示进度样式一个是显示声音大小
		rangeType: {
			type: String,
			default: 'progress'
		},
		currentColor: {
			type: String,
			default: '#C62F2F'
		},
		ballWidth: {
			type: String,
			default: '40'
		}
	},
	computed: {
		musicCurrentTime () {
			if (this.type === 'progress') {
				return this.$store.getters.getCurrentTime ? this.$store.getters.getCurrentTime : '00:00'
			}
			if (this.type === 'volume') {
				return false
			}
		},
		musicDuration () {
			if (this.type === 'progress') {
				return this.$store.getters.getMusicDuration ? this.$store.getters.getMusicDuration : '00:00'
			}
			if (this.type === 'volume') {
				return false
			}
		},
		progressWidth () {
			if (this.type === 'progress') {
				if (this.$store.getters.getIsLoadStart) {
					return {
						'width': '0'
					}
				} else {
					return {
						'width': `calc(${(this.$store.getters.getCurrentTime / this.$store.getters.getMusicDuration * 100).toFixed(2)}%`
					}
				}
			}
			if (this.type === 'volume' && this.$store.getters.getAudioElement) {
				this.$store.getters.getAudioElement.volume = this.volume
				return {
					'width': `${this.volume * 100}%`
				}
			}
		},

		progressBall () {
			if (this.type === 'progress') {
				if (this.$store.getters.getIsLoadStart) {
					return {
						'left': 'calc(0% - 7px)'
					}
				} else {
					return {
						'left': `calc(${(this.$store.getters.getCurrentTime / this.$store.getters.getMusicDuration * 100).toFixed(2)}%)`
					}
				}
			}
			if (this.type === 'volume' && this.$store.getters.getAudioElement) {
				this.$store.getters.getAudioElement.volume = this.volume
				return {
					'left': `calc(${this.volume * 100}% - 7px)`
				}
			}
		}
	},
	methods: {
		mouseDown () {
			canDrag = true
		},
		mouseMove (event) {
			if (canDrag) {
				let e = event || window.event
				let mouseX = e.pageX
				let offsetLeft = this.$refs.duration.offsetLeft
				persentWidth = Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100)
				persentWidth = persentWidth > 100 ? 100 : persentWidth
				persentWidth = persentWidth < 0 ? 0 : persentWidth
				if (this.type === 'progress') {
					// this.$store.getters.getAudioElement.currentTime = this.duration * persentWidth / 100
					this.$refs.currentProgress.style.width = `${persentWidth}%`
					this.$refs.ball.style.left = `calc(${persentWidth}% - 7px)`
				}
				if (this.type === 'volume') {
					this.$store.getters.getAudioElement.volume = persentWidth / 100
					this.$refs.currentProgress.style.width = `calc(${persentWidth}%`
					this.$refs.ball.style.left = `calc(${persentWidth}% - 7px)`
				}
			} else {
				return
			}
		},
		mouseUp () {
			if (canDrag !== false) {
				canDrag = false
				if (this.type === 'progress') {
					if (isNaN(this.$store.getters.getAudioElement.duration)) return
					this.$store.getters.getAudioElement.currentTime = this.$store.getters.getAudioElement.duration * persentWidth / 100
				}
				if (this.type === 'volume') {
					this.$store.getters.getAudioElement.volume = persentWidth / 100
				}
			}
		},
		touchMove (event) {
			if (canDrag) {
				if (this.type === 'progress') {
					let mouseX = event.touches[0].pageX
					let offsetLeft = this.$refs.duration.offsetLeft
					persentWidth = Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100)
					persentWidth = persentWidth > 100 ? 100 : persentWidth
					persentWidth = persentWidth < 0 ? 0 : persentWidth
					// this.$store.getters.getAudioElement.currentTime = this.duration * persentWidth / 100
					this.$refs.currentProgress.style.width = `${persentWidth}%`
					this.$refs.ball.style.left = `calc(${persentWidth}% - 7px)`
				}
				if (this.type === 'volume') {
					let mouseX = event.touches[0].pageX
					let offsetLeft = this.$refs.duration.offsetLeft
					persentWidth = Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100)
					// alert(Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100))
					this.$store.getters.getAudioElement.volume = persentWidth / 100
					this.$refs.currentProgress.style.width = `${persentWidth}%`
					this.$refs.ball.style.left = `calc(${persentWidth}% - 7px)`
				}
			} else {
				return
			}
		},
		touchEnd (event) {
			if (canDrag !== false) {
				canDrag = false
				if (this.type === 'progress') {
					if (isNaN(this.$store.getters.getAudioElement.duration)) return
					this.$store.getters.getAudioElement.currentTime = this.$store.getters.getAudioElement.duration * persentWidth / 100
				}
				if (this.type === 'volume') {
					this.$store.getters.getAudioElement.volume = persentWidth / 100
				}
			}
		},
		setCurrentProgress (event) {
			// if (this.canDrag) {
				let e = event || window.event
				let mouseX = e.pageX
				let offsetLeft = this.$refs.duration.offsetLeft
				persentWidth = Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100)
				persentWidth = persentWidth > 100 ? 100 : persentWidth
				persentWidth = persentWidth < 0 ? 0 : persentWidth
				if (isNaN(this.$store.getters.getAudioElement.duration)) return
				this.$store.getters.getAudioElement.currentTime = Math.floor(this.$store.getters.getAudioElement.duration * persentWidth) / 100
				this.$refs.currentProgress.style.width = `${persentWidth}%`
				this.$refs.ball.style.left = `calc(${persentWidth}% - 7px)`
			// }
			// if (this.type === 'volume') {
			// 	let e = event || window.event
			// 	let mouseX = e.pageX
			// 	let offsetLeft = this.$refs.duration.offsetLeft
			// 	persentWidth = Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100)
			// 	this.$store.getters.getAudioElement.volume = persentWidth / 100
			// 	this.$refs.currentProgress.style.width = `${persentWidth}%`
			// 	this.$refs.ball.style.left = `calc(${persentWidth}% - 7px)`
			// }
		},
		timerFomart (time) {
			if (isNaN(time)) return '00:00'
			let min = time / 60 > 9 ? Math.floor(time / 60) : '0' + Math.floor(time / 60)
			let miao = time % 60 > 9 ? Math.floor(time % 60) : '0' + Math.floor(time % 60)
			return min + ':' + miao
		}
	},
	mounted () {
		console.log(2222)
		this.type = this.rangeType
		this.currentcolor = this.currentColor
		this.ballwidth = this.ballWidth
		// this.$refs.ball.style.width = `${this.ballwidth}px`
		// this.$refs.ball.style.height = `${this.ballwidth}px`
		// this.$refs.ball.style.marginTop = `-${this.ballwidth / 2 - 1}px`
		if (!this.currentcolor.length > 0 || this.type === 'progress') return
		this.$refs.currentProgress.style.background = this.currentcolor
	}
}

</script>

<style lang="less">
@import '../../less/variable';
    // 海报页面
    .bg-image(@url) {
        background-image: url('@{url}@2x.png');
        @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3){
            background-image: url('@{url}@3x.png');
        }
    }
    .sharePages{
        .range{
            .duration{
                .ball{
                    .bg-image('http://yun.dui88.com/circular');
                    background-size: 100%;  
                } 
                .currentProgress{
                    background: #a4a4a4;
                }   
            }    
        }    
    }
	.range{
		width:100%;
		height:100%;
		display:flex;
		margin: 0 auto;
		align-items:center;
		display:flex;
		box-sizing:border-box;
		padding:20/@rem 0;
		.rangeicon{
			font-size:14px;
			color:rgba(255,255,255,0.7);
			margin-right:10px;
		}
		.span-left{
			font-size:12px;
			color:rgba(255,255,255,0.8);
			margin-right:10px;
		}
		.duration{
			flex:1;
			height:4/@rem;
			border-radius:4/@rem;
			background:@color-bg-body;
			margin:0 auto;
			font-size:0;
			cursor:pointer;
			position:relative;
			.currentProgress{
				display:inline-block;
				width:0%;
				height:4/@rem;
				border-radius:4/@rem;
				float:left;
				background:@color-black;
			}
			.ball{
				display:inline-block;
				position:absolute;
				width:36/@rem;
				height:36/@rem;
				margin-left:-14/@rem;
				margin-top:-16/@rem;
				// background:@color-black;
				background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAElBMVEUAAAA0NDQ0NDQ3Nzc1NTU0NDTWLQl3AAAABXRSTlMA5qYc7dRG+h8AAAA7SURBVCjPYxgUgFkxNFAZXdAkNDQ0xABNUDUUCBTQBEVBggJogqEgEDAqOJgFoRFHOIoRiQEz2QwKAACA9TLhtF4zDQAAAABJRU5ErkJggg==)no-repeat;
				background-size: 100%;
				border-radius: 20%;
				cursor:pointer;
			}
			}
		.span-right{
			font-size:12px;
			color:rgba(255,255,255,0.8);
			margin-left:10px;
		}
		}
</style>
