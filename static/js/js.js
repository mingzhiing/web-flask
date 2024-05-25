$(document).ready(function() {




	var screen_w=window.innerWidth;
	var screen_h=window.innerHeight;
	var center_dot={
		x:screen_w/2,
		y:screen_h/2
	}
	var MobileWidth=768;
	var IsMobile=false;

	if(screen_w<=MobileWidth){
		IsMobile=true;
	}else{
		IsMobile=false;
	}

	//桌面菜单交互
	// $(".menu_list").hover(function(){
	// 	if(!IsMobile){ //如果是PC
	// 		$(".wrap_head").addClass("submenu_show");
	// 	}else{
	// 		return false;
	// 	}
	// 	console.log("in");
	// },function(){
	// 	if(!IsMobile){ //如果是PC
	// 		$(".wrap_head").addClass("submenu_hide");
	// 		var timer=setTimeout(function(){
	// 			$(".wrap_head").removeClass("submenu_show");
	// 			$(".wrap_head").removeClass("submenu_hide");
	// 		},150);
	// 	}else{
	// 		return false;
	// 	}
	// 	console.log("out");
	// });

	if(!IsMobile) { //  桌面菜单交互
		$(".menu_list").hover(function(){
			if(window.innerWidth >768){
				$(".wrap_head").addClass("submenu_show");
			}
		},function(){
			if(window.innerWidth >768){
				$(".wrap_head").addClass("submenu_hide");
				var timer=setTimeout(function(){
					$(".wrap_head").removeClass("submenu_show");
					$(".wrap_head").removeClass("submenu_hide");
				},150);
			}
		});
	}



	$(".menu_list .menu_item").hover(function(){
		if(!IsMobile){ //如果是PC
			if(!$(".wrap_head").hasClass("submenu_show")){
				$(".wrap_head").addClass("submenu_show");
			}
			$(this).addClass("sublist_show");
			$(this).children(".sub_list").show();
		}else{
			return false;
		}
	},function(){
		if(!IsMobile){ //如果是PC
			$(this).addClass("sublist_hide");
			var that=this;
			var timer=setTimeout(function(){
				$(that).removeClass("sublist_show");
				$(that).removeClass("sublist_hide");
				$(that).children(".sub_list").hide();
			},150);
		}else{
			return false;
		}
	});

	function setMenuHook(){
		if(!IsMobile){ //如果是PC
			$(".menu_item").append("<span class='menu_hook'></span>");
			var list=$(".menu_item .menu_hook");
			for(var i=0;i<list.length;i++){
				$(list[i]).css({
					"width":($(list[i]).width()+72)+"px"
				});
			}
		}else{
			return false;
		}
	}
	// setMenuHook();


	//优化交互方案，用before伪类，横向平铺，让子菜单不用只触发到菜单项才展开 .menu_list .menu_item .txt:before

	//桌面连接模块

	$(".link_area .tab_list li").on("mouseenter",function(){
		if(!$(this).hasClass("current")){
			$(".link_area .tab_list li").removeClass("current");
			$(this).addClass("current");
			$(".link_area .con").hide();
			$(".link_area .con_"+$(this).data("num")).fadeIn();
		}

	});

	//人才发展模块
	function setDevelopSize(){
		if(!IsMobile){ //如果是PC
			$(".develop_area").css({
				"height":(screen_w*780/1440)+"px"
			});

			$(".develop_area .slide_list img").css({
				"width":screen_w+"px",
				"height":(screen_w*780/1440)+"px"
			});
		}else{
			$(".develop_area").css({
				"height":"auto"
			});
			$(".develop_area .slide_list img").attr("style","");
		}
	}

	//setDevelopSize();
	var modHeight = $('.mod-tab').height();
	$(window).resize(function(){
		modHeight = $('.mod-tab').height();
		screen_w=window.innerWidth;
		screen_h=window.innerHeight;
		center_dot={
			x:screen_w/2,
			y:screen_h/2
		}

		if(screen_w<=MobileWidth){
			IsMobile=true;
		}else{
			IsMobile=false;
		}

		//setDevelopSize();
		if(screen_w >768){
			$(".menu_list").css({
				"transform":"translate(0px,0)",
				"opacity": 1
			});
		}else{
			$(".menu_list").css({
				"transform":"translate(-260px,0)",
				"opacity": 0.8
			});
		}
	});




	//移动端菜单
	$(".icon_menu .i_menu").click(function(){
		$(".menu_list").css({
			"transform":"translate(0,0)",
			"opacity":1
		});
		$(this).show();
		$(".icon_menu .i_close").show();
		$(".icon_menu .i_menu").hide();
		$(".wrap_head .bg_hover").show();
	});

	$(".icon_menu .i_close").click(function(){
		MenuHide();
	});

	$(".wrap_head .bg_hover").click(function(){
		MenuHide();
	});

	function MenuHide(){
		$(".menu_list").css({
			"transform":"translate(-260px,0)",
			"opacity":0.8
		});
		$(".icon_menu .i_close").hide();
		$(".icon_menu .i_menu").show();
		$(".wrap_head .bg_hover").hide();
		$(".search_area").show();
	}

	//移动端搜索
	$(".search_icon").click(function(){
		$(".wrap_head").addClass("search_area_show");
		$(".icon_menu").hide();
		$(".search_area .ipt_search").show().focus();
	});

	$(".search_area .ipt_search").blur(function(){
		$(".wrap_head").removeClass("search_area_show");
		$(".icon_menu").show();
		$(".search_area .ipt_search").hide();
	});




	//移动端页脚
	$(".join_us .tit_area").click(function(){
		if($(this).parent().hasClass("sublist_show")){
			$(this).parent().removeClass("sublist_show");
		}else{
			$(this).parent().addClass("sublist_show");
		}
	});

	$(".contact_us .tit_area").click(function(){
		if($(this).parent().hasClass("sublist_show")){
			$(this).parent().removeClass("sublist_show");
		}else{
			$(this).parent().addClass("sublist_show");
		}
	});

	$(".legal_info .tit_area").click(function(){
		if($(this).parent().hasClass("sublist_show")){
			$(this).parent().removeClass("sublist_show");
		}else{
			$(this).parent().addClass("sublist_show");
		}
	});


	if($('.video1')[0]){
		//banner
		var isBanner = false;
		var isBannerI = 0;

		var u = navigator.userAgent;
		if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
			$('.video1').hide();
			$('.banner_txt').addClass('animation');
			} else if (u.indexOf('iPhone') > -1) {//苹果手机
				document.addEventListener("WeixinJSBridgeReady", function () {
					   $('#video')[0].play()
				}, false);
				} else if (u.indexOf('Windows Phone') > -1) {//winphone手机
					$('.video1').hide();
					$('.banner_txt').addClass('animation');
			}



		$('.video1')[0].onplaying = function (){
			$('.banner_txt').addClass('animation');
			isBanner = true;
		}


		setInterval(function (){
			if(isBanner){
				if($('.video1')[0].currentTime < 0.5){
					if(isBannerI){
						$('.banner_txt .hook_area').addClass('animation1');
					}
					$('.banner_txt .hook_area').removeClass('animation2');
					$('.banner_txt .hook_area').removeClass('animation3');
					$('.banner_txt .hook_area').removeClass('animation4');
				}

				if($('.video1')[0].currentTime > 2.7){
					isBannerI = 1;
					$('.banner_txt .hook_area').addClass('animation2');
				}
				if($('.video1')[0].currentTime > 4.5){
					$('.banner_txt .hook_area').addClass('animation3');
				}
				if($('.video1')[0].currentTime > 6.4){
					$('.banner_txt .hook_area').addClass('animation4');
				}
			}

		},1000/24);
	}



	// $(document).scroll(function() {
	// 	console.log($(window).scrollTop());
	// 	console.log($(".mod-tab").offset().top);
	// 	if($(window).scrollTop() >= $('.mod-tab-content').offset().top - $(".mod-tab").height()){
	// 		$(".mod-tab").addClass('mod-tab-fixed');
	// 		//$('.mod-section-ad').css('margin-bottom',$(".mod-tab").height()+'px');
	// 	}else{
	// 		$(".mod-tab").removeClass('mod-tab-fixed');
	// 		//$('.mod-section-ad').css('margin-bottom','0px');
	// 	}
	// })

	/* 连接责任与信任banner */
	var resp_area_banner_time;
	var resp_area_index = 0;
	var resp_area_width = $('.resp_area .slide_area').width();
	var resp_area_len = $('.resp_area .slide_list li').length;
	function resp_area_banner(l){
		if(l){
			resp_area_index--;
			resp_area_index = resp_area_index < 0 ? resp_area_len-1 : resp_area_index;
		}else{
			resp_area_index++;
			resp_area_index = resp_area_index < resp_area_len ? resp_area_index : 0;
		}

		$('.resp_area .slide_list li').removeClass('active');
		$('.resp_area .slide_list li').eq(resp_area_index).addClass('active');
	}
	var resp_area_banner_time = setInterval(resp_area_banner,4000);

	$('.resp_area .slide_area .icon_arrow').on('click',function(){
		clearInterval(resp_area_banner_time);
		if($(this).hasClass('icon_arrow_l')){
			resp_area_banner(1);
		}else{
			resp_area_banner();
		}
		resp_area_banner_time = setInterval(resp_area_banner,4000);
	})

	/* 连接人才与发展banner */
	var develop_area_banner_time;
	var develop_area_index = 0;
	var develop_area_width = $('.develop_area .slide_area').width();
	var develop_area_len = $('.develop_area .slide_list li').length;
	function develop_area_banner(l){
		if(l!=undefined){
			develop_area_index = l;
		}else{
			develop_area_index++;
		}
		develop_area_index = develop_area_index < develop_area_len ? develop_area_index : 0;
		$('.develop_area .slide_list li').removeClass('active');
		$('.develop_area .slide_list li').eq(develop_area_index).addClass('active');
		$('.develop_area .slide-tab .li').removeClass('active');
		$('.develop_area .slide-tab .li').eq(develop_area_index).addClass('active');
	}
	var develop_area_banner_time = setInterval(develop_area_banner,5000);

	$('.develop_area .slide-tab .li').on('click',function(){
		clearInterval(develop_area_banner_time);
		develop_area_banner($(this).index());
		develop_area_banner_time = setInterval(develop_area_banner,4000);
	})

	$('.back_to_top').on('click',function(){
		$('html , body').animate({scrollTop: 0},'slow');
	})


	/* 二级页面导航栏 */
	function pageTab(){
		var deviceWidth = $(window).width() // 设备屏幕宽度
		if(deviceWidth<=768){
			$('.mod-tab .mc-right').hide();
			$('.mod-tab .mc-left').hide();
			$('.mod-tab .clearfix ul').css({'left':'16px','right': 'auto'});
		}else{
			var modTabUlW = $('.mod-tab .clearfix ul').width();
			var modTabW = $('.mod-tab .clearfix').width();
			if(modTabUlW >modTabW){
				$('.mod-tab .mc-right').show();
			}

			$('.mod-tab .mc-right').on('click',function(){
				$('.mod-tab .clearfix ul').css({'right':'0px','left': 'auto'});
				$('.mod-tab .mc-right').hide();
				$('.mod-tab .mc-left').show();
			})

			$('.mod-tab .mc-left').on('click',function(){
				$('.mod-tab .clearfix ul').css({'left':'16px','right': 'auto'});
				$('.mod-tab .mc-right').show();
				$('.mod-tab .mc-left').hide();
			})
		}
	}
	var brandTabOffTop = [];
	$(window).resize( function() { // 当pc端页面宽度缩小到移动端大小时
		$('.mod-tab .clearfix ul').css({'left':'16px','right': 'auto'});
		pageTab();
		brandTabOffTop = [];

		var sanWidth = $('.artice-box .san').width() - 1;
		$('.artice-box .san').css('right',-sanWidth+'px');

		if($(window).width() <=768){
			$('.mobile-tab-brand').each(function(){
				var that = $(this);
				setTimeout(function(){
					brandTabOffTop.push(that.offset().top);
				},100)
			})
		}else{
			$('.pc-tab-brand').each(function(){
				brandTabOffTop.push($(this).offset().top);
			})
		}
	})




	setTimeout(function(){
		pageTab();
		brandTabOffTop =[];
		var modTab;
		if($('.mod-tab').length>=1){
			modTab = $('.mod-tab').offset().top;
		}
		var p=0,t=0;
		// if($(document).scrollTop()>=$('.head_white').height()){
		// 	$('.head_white').addClass('fixed');
		// }
		// if($(document).scrollTop()>=modTab){
		// 	$('.mod-tab').addClass('fixed');
		// }else{
		// 	$('.mod-tab').removeClass('fixed');
		// }

		if($(window).width() <=768){
			$('.mobile-tab-brand').each(function(){
				var that = $(this);
				setTimeout(function(){
					brandTabOffTop.push(that.offset().top);
				},100)
			})

		}else{
			$('.pc-tab-brand').each(function(){
				brandTabOffTop.push($(this).offset().top);
			})
		}


		var showHeadState = true;
		$(window).scroll(function(event){
			p = $(this).scrollTop();
			if(t<=p){
				//向下滚
				if($(document).scrollTop()>=$('.head_white').height()+30){
					if($('.head_white').hasClass('hestate')){
						$('.head_white').css({'position':'fixed','top':'-72px'});
					}else{
						$('.head_white').hide();
						$('.head_white').css({'position':'fixed','top':'-72px'});
					}

					$(".wrap_head").removeClass("submenu_show");
					$(".wrap_head").removeClass("submenu_hide");
					$('.sub_list').hide();
				}
				$('.mod-tab').css('top','0px');
			}else{
				//向上滚
				if(showHeadState == true){
					//$('.head_white').removeClass('fixed');
					if($(document).scrollTop()<$('.head_white').height()){
						$('.head_white').css({'position':'fixed','top':'0px'});
						$('.head_white').removeClass('hestate')
						setTimeout(function(){
							$('.head_white').css({'position':'absolute','top':'0px'});
						},50)
					}else{
						$('.head_white').show();
						setTimeout(function(){
							$('.head_white').css({'position':'fixed','top':'0px'});
							$('.head_white').addClass('hestate')
						},20)
					}

				}
			}

			setTimeout(function(){t = p;},0);
			if($(document).scrollTop()>=modTab){
				$('.mod-tab').addClass('fixed');
			}else{
				$('.mod-tab').css('top','0px');
				$('.mod-tab').removeClass('fixed');
			}

			if($(window).width() <=768){
				if(showHeadState != false){
					scrollNav($('.mobile-tab-brand'));
				}
			}else{
				if(showHeadState != false){
					scrollNav($('.pc-tab-brand'));
				}
			}
		});

		$('.mod-tab li').on('click',function(){
			showHeadState = false;
			$('.mod-tab li').removeClass('active-tab');
			$(this).addClass('active-tab');
			$('.mod-tab .line').stop().animate({'left':$(this).position().left+'px','width': $(this).width()},200);
			var t = brandTabOffTop[$(this).index()];
			$("html,body").animate({scrollTop: t+"px"}, 200);
			setTimeout(function(){
				showHeadState = true;
			},300)
		})

		// 设置疫情页面斜边三角的初始高
		var sanWidth = $('.artice-box .san').width() - 1;
		$('.artice-box .san').css('right',-sanWidth+'px');

	},50)

	function scrollNav(dom){
		var sections = dom;
		sections.each(function(index,el){
			var _this = $(this);
			if( _this.offset().top <=  $(document).scrollTop()){
				$('.mod-tab .line').stop().animate({'left':$('.mod-tab li').eq(index).position().left+'px','width': $('.mod-tab li').eq(index).width()},200);
				$('.mod-tab li').removeClass('active-tab');
				$('.mod-tab li').eq(index).addClass('active-tab');
			}
		})
	}



});
