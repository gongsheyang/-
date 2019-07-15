// pages/post/post-detail/post-detail.js
var postData = require('../../../data/post-data.js');
var app = getApp();
var currentId;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		isPlayingMusic:false
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var globalData=app.globalData;
		var listItemId=options.id;
		// console.log(postData);
		for (var i = 0; i < postData.newListdata.length;i++)
		{
			if (postData.newListdata[i].postId==listItemId)
			{
				currentId=i;
				this.setData({ itemDetail: postData.newListdata[i] });
				var postsCollected = wx.getStorageSync('postsCollected');
				if (postsCollected) {
					var postCollected = postsCollected[i];
					this.setData({ collected: postCollected });
				}
				else {
					var postsCollected = {};
					postsCollected[i] = false;
					wx.setStorageSync('postsCollected', postsCollected)
				}
			}
		}

		if (app.globalData.g_isPlayingMusic&&app.globalData.g_currentMusicPostId==currentId) {
			this.setData({ isPlayingMusic: true });
		}

		this.setMusicMonitor();
		
	},

	setMusicMonitor:function()
	{
		var that = this;//将上下文传给that
		wx.onBackgroundAudioPlay(function () {
			if (app.globalData.g_currentMusicPostId == currentId || app.globalData.g_currentMusicPostId == null)
			{
				that.setData({ isPlayingMusic: true });
				app.globalData.g_currentMusicPostId = currentId;
			}
			app.globalData.g_isPlayingMusic = true;
		});
		wx.onBackgroundAudioPause(function () {
			that.setData({ isPlayingMusic: false });
			app.globalData.g_isPlayingMusic = false;
			// app.globalData.g_currentMusicPostId = null;
		});

		wx.onBackgroundAudioStop(function () {
			that.setData({ isPlayingMusic: false });
			app.globalData.g_isPlayingMusic = false;
			app.globalData.g_currentMusicPostId = null;
		});
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {
		
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},

	onCollectedTap: function () {
		var postsCollected = wx.getStorageSync('postsCollected');
		var postCollected=postsCollected[currentId];
		postCollected = !postCollected;
		postsCollected[currentId] = postCollected;
		wx.setStorageSync('postsCollected', postsCollected);
		this.setData({ collected: postCollected });

		wx.showToast({
			title: postCollected?'收藏成功':'取消成功',
			duration:1000,
			icon:"success"
		})
	},
	onMusicTap:function(event){
		var isPlayingMusic = this.data.isPlayingMusic;
		if (isPlayingMusic)
		{
			wx.pauseBackgroundAudio();
			this.setData({
				isPlayingMusic:false
			});
		}
		else
		{
			wx.playBackgroundAudio({
				dataUrl: postData.newListdata[currentId].music.url,
				title: postData.newListdata[currentId].music.title,
				coverImgUrl: postData.newListdata[currentId].music.coverImg
			});
			this.setData({
				isPlayingMusic: true
			});
		}
	}
})