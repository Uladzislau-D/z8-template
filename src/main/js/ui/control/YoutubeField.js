Z8.define('org.zenframework.z8.template.controls.youtubeUrl', {
    extend: 'Z8.form.field.Text',

    setValue: function(value, displayValue) {
        player = this.selectNode('player');
        if (player && value) {           
			DOM.removeCls(this.player, 'display-none');
            this.playVideo(getVideoId(value));
        } else {
			DOM.addCls(this.player, 'display-none');
            this.stopVideo();
        }
        this.callParent(value, displayValue);
        if (this.getValue() && this.getValue() !== '') {
            if (document.getElementById("you_script") == null) {
                let fstTag = document.getElementsByTagName('script')[0];
                fstTag.parentNode.insertBefore(createYoutubeTag(), fstTag);     
            }
        }
    },

    htmlMarkup: function() {
        let markup = this.callParent();
        markup.cn.add({
            tag: 'div',
            id: 'player'
        });
        return markup;
    },   
    
	 /**
     * JavaScript function to validate the video
     * of any valid Youtube Url, given as input string.
     */
    validate: function () {
      let value = this.getValue();
      if (value != null && value !== '') {
    	  let regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    	  this.setValid(regExp.test(value));
      }
    },

    playVideo: function (videoId) {
        if (player && player.cueVideoById) {
            player.cueVideoById(videoId);
            player.playVideo();
        }
    },

    stopVideo: function () {
        if (player && player.stopVideo) {
            player.stopVideo();
        }
    } 
});

var player;
function onYouTubeIframeAPIReady() {
    let videoPlayer = document.getElementById('player');
    player = new YT.Player('player', {
        height: '240',
        width: '320',
        videoId: videoPlayer ? getVideoId(videoPlayer.parentElement.childNodes[1].getAttribute('title')): null,
        events: {
            'onReady': onPlayerReady,
        }
    });
}
function getVideoId(url){
	let videoId;
    if (videoId = url.match(/(\?|&)v=([^&#]+)/)) {
        videoId = videoId.pop();
    } else if (videoId = url.match(/(\.be\/)+([^\/]+)/)) {
        videoId = videoId.pop();
    } else if (videoId = url.match(/(\embed\/)+([^\/]+)/) ) {
        videoId = videoId.pop().replace('?rel=0', '').replace('embed/', '');
    }
    videoId = videoId.split('?').length > 0 ? videoId.split('?')[0] : videoId;
    return videoId;
}
function onPlayerReady(event) {
    event.target.playVideo();
}
function createYoutubeTag(){
	let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    tag.id = "you_script";
    return tag;
}