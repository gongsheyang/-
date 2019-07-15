Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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

	}

	,
	/**
	 * 点击进入按钮
	 */
	onEnterClick: function(event){
		wx.switchTab({
			url: '../post/post',
		});
	},
	onEnterLongClick:function(event){
		wx.showActionSheet({
			itemList:['清除所有缓存'],
			success(res){
				switch(res.tapIndex)
				{
					case 0:
						wx.showModal({
							title:'提示',
							content:'是否清除缓存？',
							success(res)
							{
								if(res.confirm)
								{
									wx.clearStorageSync();
									wx.showToast({
										title: '成功清除缓存',
										icon: 'success',
										duration: 1000
									})
								}
							}
						});
						break;
					default:
						break;
				}
			}
		});
	}
})