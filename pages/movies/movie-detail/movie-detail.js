// pages/movies/movie-detail/movie-detail.js
var app=getApp();
// var util=require("../../../utils/util.js");
import {Movie} from 'class/Movie.js';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		movie:{},
		title:"光影文字"
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var movieId=options.id;
		var url=app.globalData.doubanBase+"/v2/movie/subject/"+movieId;
		// util.http(url,this.processDoubanData);
		var movie = new Movie(url);
		movie.getMovieData((movie)=>{
			this.setData({
				movie:movie
			});
		});
	},
	// processDoubanData:function(data){
	// 	if(!data)
	// 	{
	// 		return;
	// 	}
	// 	var director={
	// 		avatar:"",
	// 		name:"",
	// 		id:""
	// 	}
	// 	if(data.directors[0]!=null)
	// 	{
	// 		if(data.directors[0].avatars!=null)
	// 		{
	// 			director.avatar=data.directors[0].avatars.large;
	// 		}
	// 		director.name=data.directors[0].name;
	// 		director.id=data.directors[0].id;
	// 	}
	// 	var movie={
	// 		movieImg:data.images?data.images.large:"",
	// 		country:data.countries[0],
	// 		title:data.title,
	// 		originalTitle:data.original_title,
	// 		wishCount: data.wish_count,
	// 		commentCount:data.comments_count,
	// 		year:data.year,
	// 		generes:data.genres.join("、"),
	// 		stars:util.convertToStarsArray(data.rating.stars),
	// 		score:data.rating.average,
	// 		director:director,
	// 		casts:util.convertToCastString(data.casts),
	// 		castsInfo:util.convertToCastInfos(data.casts),
	// 		summary:data.summary
	// 	}
	// 	this.setData({
	// 		movie:movie,
	// 		title:data.title
	// 	});
	// },
	onReady: function ()
	{
		wx.setNavigationBarTitle({
			title: this.data.title,
		});
	},
	viewMoviePostImg:function(event)
	{
		var src = event.currentTarget.dataset.src;
		wx.previewImage({
			urls: [src],
			current:src
		});
	}
})
