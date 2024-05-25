/*====================================================================================================*/
/* Check box  */

/*====================================================================================================*/
function guiCheckboxInit () {
  $('.gui-checkbox a').each(function () {
    if (!$(this).hasClass('inited')) {
      $(this).addClass('inited')
      $(this).click(guiCheckbox)
    }
  })
  $('.gui-radio a').each(function () {
    if (!$(this).hasClass('inited')) {
      $(this).addClass('inited')
      $(this).click(guiRadio)
    }
  })
}

/*----------------------------------------------------------------------------------------------------*/
function guiCheckbox (e) {
  e.preventDefault()
  var sVal = ''
  $(e.target).closest('a').toggleClass('checked')
  $(e.target).closest('.gui-checkbox').find('a.checked').each(function () {
    sVal += (sVal == '' ? '' : ',') + $(this).attr('data-val')
  })
  $(e.target).closest('.gui-checkbox').find('input[type=hidden]').val(sVal)
}

/*----------------------------------------------------------------------------------------------------*/
function guiRadio (e) {
  e.preventDefault()
  var sVal = $(e.target).closest('a').attr('data-val')
  $(e.target).closest('.gui-radio').find('a.checked').removeClass('checked')
  $(e.target).closest('a').addClass('checked')
  $(e.target).closest('.gui-radio').find('input[type=hidden]').val(sVal)
}

/*====================================================================================================*/
/* Flipping */

/*====================================================================================================*/
function guiFlip () {
  $('.gui-flip').each(function () {
    var aTxt = ('' + $(this).attr('data-text')).split(',')
    var iCur = parseInt($(this).attr('data-index'))
    iCur = isNaN(iCur) ? 0 : iCur
    var iNew = (iCur + 1 + aTxt.length) % aTxt.length
    $(this).html('<span>' + aTxt[iCur] + '</span>' + '<span>' + aTxt[iNew] + '</span>')
    $(this).attr('data-index', iNew)

    $(this).css({
      'line-height': '1.5em',
      'word-break': 'keep-all',
      'white-space': 'nowarp',
      'position': 'relative',
      'display': 'inline-block',
      'vertical-align': 'top'
    })
    $(this).find('span').css({
      'display': 'block',
      'position': 'absolute'
    })
    var iW = 0
    $(this).find('span').each(function () {
      iW = Math.max($(this).width(), iW)
    })
    $(this).css({
      'width': iW + 'px',
      'top': '-2px'
    })

    var iSpd = {
      'duration': 200,
      'easing': 'swing'
    }
    $(this).find('span:first').css({
      'opacity': 1,
      'top': '0em',
      'left': '0px'
    }).animate({
      'opacity': 0,
      'top': '-1em',
      'left': '0px'
    }, iSpd)
    $(this).find('span:last').css({
      'opacity': 0,
      'top': '1em',
      'left': '0px'
    }).animate({
      'opacity': 1,
      'top': '0em',
      'left': '0px'
    }, iSpd)
  })
  setTimeout('guiFlip()', 4000)
}

/*====================================================================================================*/
/* Lazy */

/*====================================================================================================*/
function guiLazy (bInit) {
  $('.gui-lazy-loading').each(function () {
    if (!$(this).hasClass('inited')) {
      $(this).addClass('inited')
      $(this).append('<div class="gui-lazy-trigger">&nbsp;</div>')
      var iLzy = parseInt($(this).attr('data-lazy'))
      var iCnt = 0
      $(this).find('.gui-lazy-item').each(function () {
        if (iCnt < iLzy) {
          $(this).show()
        } else {
          $(this).hide()
        }
        iCnt++
      })
    }
  })
  if (bInit) {
    $(window).bind('scroll', guiLazyScroll)
    $('.ten_news_search').find('input,select').each(function () {
      if ($(this).attr('name') == 'search') {
        $(this).bind('keyup', guiLazySearchKeyUp)
        $(this).attr('data-old', $(this).val())
      } else {
        $(this).bind('change', guiLazySearch)
      }
    })
  }
}

/*----------------------------------------------------------------------------------------------------*/
function guiLazyScroll () {
  $('.gui-lazy-trigger').each(function () {
    var oRoot = $(this).closest('.gui-lazy-loading')
    var iTH = parseFloat($(oRoot).attr('data-lazy-threshold'))
    iTH = (iTH < 0 || isNaN(iTH)) ? 0.66 : iTH

    var iST = $(window).scrollTop() + ($(window).height() * iTH)
    var iTT = $(this).position().top
    var iLm = 0
    while (iTT < iST && iLm < 10) {
      $(oRoot).find('.gui-lazy-item:not(:visible):not(.notmatch):first').fadeIn()
      iTT = $(this).position().top
      iLm++
    }
  })
}

/*----------------------------------------------------------------------------------------------------*/
function guiLazySearchKeyUp (e) {
  var sVal = ('' + $(e.target).val()).toLowerCase()
  var sOld = ('' + $(e.target).attr('data-old')).toLowerCase()
  $(e.target).attr('data-old', $(e.target).val())
  if (sVal == sOld) {
    return
  }
  guiLazySearch(e)
}

/*----------------------------------------------------------------------------------------------------*/
function guiLazySearch (e) {
  var aData = {}
  $('.ten_news_search').find('input,select').each(function () {
    var sNam = $(this).attr('name')
    var sVal = $(this).val()
    aData[sNam] = sVal
  })
  $('.block').each(function () {
    var iCnt = 0
    $(this).find('.gui-lazy-item').each(function () {
      $(this).find('.gui-lazy-subitem').hide();
      $(this).find('.gui-lazy-subitem-label').hide();
      var bMatch = true
      for (var sK in aData) {
        var bMat = false
        var sVal = aData[sK]
        if (sK == 'search') {
          $(this).find('h1,h2,h3,h4,h5,h6,p').each(function () {
            if( !$(this).hasClass('gui-lazy-subitem-label') ){
              var sHtm = (''+$(this).html()).toLowerCase();
              var bMt = (''+sHtm).indexOf((''+sVal).toLowerCase()) >= 0;
              if( bMt ){
                $(this).closest('.gui-lazy-subitem').parent().find('.gui-lazy-subitem-label').show();
                $(this).closest('.gui-lazy-subitem').show();
              }
              bMat = bMat || bMt;
            }
          });
        } else {
          var sAttr = $(this).attr('data-' + sK)
          bMat = (sAttr == undefined || sAttr == sVal || sVal == '')
        }
        bMatch = bMatch && bMat
      }
      $(this).hide()
      if (bMatch) {
        $(this).removeClass('notmatch')
        if (iCnt < 9) {
          $(this).fadeIn()
        }
        iCnt++
      } else {
        $(this).addClass('notmatch')
      }
    })
  })
}

/*====================================================================================================*/
/* Self close */

/*====================================================================================================*/
function guiCloseInit () {
  $('.gui-close').click(guiClose)
}

/*----------------------------------------------------------------------------------------------------*/
function guiClose (e) {
  e.preventDefault()
  var oRoot = $(e.target).closest('a')
  var sPrt = $(oRoot).attr('data-close')
  $(e.target).closest('.' + sPrt).hide()
}

/*====================================================================================================*/
/* Video */

/*====================================================================================================*/
function guiVideoInit () {
  $('.gui-video').find('a').each(function () {
    if (!$(this).hasClass('inited')) {
      $(this).addClass('inited')
      $(this).click(guiVideoPlay)
    }
  })
}

/*----------------------------------------------------------------------------------------------------*/
function guiVideoPlay (e) {
  e.preventDefault()
  var sHRF = $(e.target).closest('a').attr('href')
  var oRoot = $(e.target).closest('.gui-video')
  var iW = $(oRoot).width()
  var sVid = ''
  if (!('' + sHRF).match(/mp4$/)) {
    sVid = '<iframe src="' + sHRF + '?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
  } else {
    sVid = '<video autoplay controls><source src="' + sHRF + '" type="video/mp4"/></video>'
  }
  if (iW > 480 || true) {
    $(oRoot).find('img').hide()
    $(oRoot).find('a').hide()
    $(oRoot).find('video').remove()
    $(oRoot).find('iframe').remove()
    $(oRoot).append(sVid)
  } else {
    var sVid = '<div class="ten_video">' + sVid + '</div>'
    popupSwiper([sVid], 0)
  }
}

/*====================================================================================================*/
/* Swiper */

/*====================================================================================================*/
function guiSwiperInit () {
  $('.swiper-container').each(function () {
    if (!$(this).hasClass('inited')) {
      $(this).addClass('inited')
      var aCfg = { updateOnWindowResize: true }
      var bLoop = $(this).attr('data-loop') !== '0'
      var iPad = parseInt($(this).attr('data-padding'))
      var iSpace = parseInt($(this).attr('data-spacing'))
      if ($(this).find('.swiper-slide').length <= 1) {
        bLoop = false
      }

      if (bLoop) {
        aCfg['loop'] = bLoop
      }
      if (!isNaN(iSpace)) {
        aCfg['spaceBetween'] = iSpace
      }
      if (!isNaN(iPad)) {
        aCfg['slidesOffsetBefore'] = iPad
        aCfg['slidesOffsetAfter'] = iPad
      }
      var aBrk = ('' + $(this).attr('data-breakpoint')).split(',')
      if (aBrk.length > 0) {
        var aBreak = {}
        for (var i = 0; i < aBrk.length; i++) {
          var aBr = ('' + aBrk[i]).split(':')
          var iCL = parseInt(aBr[1])
          if (aBr.length == 2 && !isNaN(iCL)) {
            aBreak[aBr[0]] = { 'slidesPerView': iCL }
          }
        }
        aCfg['breakpoints'] = aBreak
      } else {
        aCfg['breakpoints'] = { 0: { 'slidesPerView': 1 } }
      }

      var sNext = $(this).attr('data-next')
      var sPrev = $(this).attr('data-prev')
      var bNext = $(sNext).length > 0
      var bPrev = $(sPrev).length > 0
      if (bNext || bPrev) {
        var aTmp = {}
        if (bNext) {
          aTmp['nextEl'] = sNext
        }
        if (bPrev) {
          aTmp['prevEl'] = sPrev
        }
        aCfg['navigation'] = aTmp
      }
      var sNav = $(this).attr('data-nav')
      var bClk = $(this).attr('data-nav-click') == 1
      var sTyp = $(this).attr('data-nav-type')
      if ($(sNav).length > 0) {
        aCfg['pagination'] = {
          'el': sNav,
          'clickable': bClk
        }
        if (sTyp == 'fraction') {
          aCfg['pagination']['type'] = sTyp
          aCfg['pagination']['renderFraction'] = function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span> | <span class="' + totalClass + '"></span>'
          }
        }
      }
      var iAuto = parseInt($(this).attr('data-autoplay'))
      if (!isNaN(iAuto) && iAuto > 0) {
        aCfg['autoplay'] = { 'delay': iAuto }
      }

      var sEff = $(this).attr('data-effect')
      if (sEff == 'fade') {
        aCfg['effect'] = 'fade'
        aCfg['fadeEffect'] = { 'crossFade': true }
      }

      var mySwiper = new Swiper(this, aCfg)
      mySwiper.on('slideChange', function () {
        guiSwiperChange(this)
      })
      guiSwiperChange(mySwiper)

      var iIdx = parseInt($(this).attr('data-index'))
      if (iIdx > 0) {
        mySwiper.slideToLoop(iIdx, 0)
      }

      $(this).find('.swiper-slide-duplicate .ten_video_play').removeClass('inited')
      guiVideoInit()
    }
  })
}

/*----------------------------------------------------------------------------------------------------*/
function guiSwiperChange (oObj) {
  var oRoot = oObj.$el
  $(oRoot).find('.swiper-slide').each(function () {
    if ($(this).find('video').length > 0) {
      if ($(this).attr('data-swiper-slide-index') == oObj.realIndex) {
        $(this).find('video').get(0).play()
      } else {
        $(this).find('video').get(0).pause()
      }
    }
  })
}

/*----------------------------------------------------------------------------------------------------*/
function popupSwiper (aData, iIdx) {
  $('.ten_album').remove()
  var sHTM = ''
  sHTM += '<div class="ten_album">'
  sHTM += '<div class="ten_album_body">'
  sHTM += '<div class="ten_album_close"><a href="" class="gui-close" data-close="ten_album">&times;</a></div>'
  sHTM += '<a href="" class="ten_album_prev"></a>'
  sHTM += '<div class="ten_album_swiper swiper-container" data-index="' + iIdx + '" data-breakpoint="0:1" data-text=".ten_album_text" data-prev=".ten_album_prev" data-next=".ten_album_next" data-nav=".ten_album_nav" data-nav-type="fraction">'
  sHTM += '<div class="ten_album_slides swiper-wrapper">'
  for (var i = 0; i < aData.length; i++) {
    sHTM += '<div class="swiper-slide">' + aData[i] + '</div>'
  }
  sHTM += '</div>'
  sHTM += '</div>'
  sHTM += '<a href="" class="ten_album_next"></a>'
  sHTM += '<div class="ten_album_desc">'
  sHTM += '<div class="ten_album_text"></div>'
  sHTM += '<div><div class="ten_album_nav"></div></div>'
  sHTM += '</div>'
  sHTM += '</div>'
  sHTM += '</div>'
  $('body').append(sHTM)
  if (aData.length <= 1) {
    $('.ten_album_next').css({ 'visibility': 'hidden' })
    $('.ten_album_prev').css({ 'visibility': 'hidden' })
    $('.ten_album_nav').css({ 'visibility': 'hidden' })
  }
  guiSwiperInit()
  guiCloseInit()
}

/*====================================================================================================*/
/* Tab */

/*====================================================================================================*/
function guiTabInit () {
  $('.gui-tab a').each(function () {
    if (!$(this).hasClass('inited')) {
      $(this).addClass('inited')
      $(this).click(guiTab)
    }
  })
}

/*----------------------------------------------------------------------------------------------------*/
function guiTab (e) {
  e.preventDefault()
  var sHref = $(e.target).closest('a').attr('href')

  if (('' + sHref).indexOf('#') == 0) {
    if ($(sHref).length > 0) {
      $('html, body').animate({ 'scrollTop': $(sHref).offset().top - 100 })
      return
    }
  }

  $(e.target).closest('.gui-tab').find('.active').removeClass('active')
  $(e.target).closest('a').addClass('active')

  var sHide = $(e.target).closest('a').attr('data-hide')
  var sShow = $(e.target).closest('a').attr('data-show')
  if (sHide) {
    $(sHide).hide()
  }
  if (sShow) {
    $(sShow).show()
  }

  var sVal = $(e.target).closest('a').attr('data-value')
  $(e.target).closest('a').parent().find('input').val(sVal)
  if ($(e.target).closest('.ten_news_search').length > 0) {
    guiLazySearch(e)
  }
}

/*====================================================================================================*/
/* Menu */

/*====================================================================================================*/
function tenFooterToggle (oObj) {
  $(oObj).closest('li').toggleClass('toggled')
}

/*----------------------------------------------------------------------------------------------------*/
function tenFooterToTop (e) {
  e.preventDefault()
  $('body,html').animate({ 'scrollTop': 0 })
}

/*----------------------------------------------------------------------------------------------------*/
function tenMenuEnter (e) {
  $(e.target).closest('li').addClass('entered')
}

function tenMenuLeave (e) {
  $(e.target).closest('li').removeClass('entered')
}

/*----------------------------------------------------------------------------------------------------*/
function tenMobileToggle (e) {
  e.preventDefault()
  $('.ten_mobile_search_panel').removeClass('opened')
  $('.ten_mobile').find('.ten_mobile_nav').removeClass('active')
  $('.ten_mobile_menu').toggleClass('ten_mobile_menu--show')
  if ($('.ten_mobile_menu').hasClass('ten_mobile_menu--show')) {
    $('.ten_mobile').find('.ten_mobile_nav').addClass('active')
  }
  tenMenuScroll()
}

function tenMobileMenuToggle (e) {
  e.preventDefault()
  var oRoot = $(e.target).closest('li')
  var oItem = $(e.target).closest('a')
  $(oItem).toggleClass('toggled')
  if ($(oItem).hasClass('toggled')) {
    $(oRoot).find('ul').slideDown()
  } else {
    $(oRoot).find('ul').slideUp()
  }
}
function tenMobileSearchToggle(){
  $('.ten_mobile').find('.ten_mobile_nav').removeClass('active');
  $('.ten_mobile_menu').removeClass('ten_mobile_menu--show');
  $('.ten_mobile_search_panel').toggleClass('opened');
}
/*----------------------------------------------------------------------------------------------------*/
function tenMenuScroll () {
  var iST = $(window).scrollTop()
  var iH = $('.ten_header').height()
  if (iST > 0) {
    $('.ten_header').addClass('ten_header--float')
    $('.ten_totop--float').addClass('ten_totop--float--show')
  } else {
    $('.ten_header').removeClass('ten_header--float')
    $('.ten_totop--float').removeClass('ten_totop--float--show')
  }
  if (iST > 0 || $('.ten_mobile_menu').hasClass('ten_mobile_menu--show')) {
    $('.ten_mobile').addClass('ten_mobile--float')
  } else {
    $('.ten_mobile').removeClass('ten_mobile--float')
  }
}

/*----------------------------------------------------------------------------------------------------*/
function tenMenuInit () {
  $('.ten_header_menu > li').on('mouseenter', tenMenuEnter)
  $('.ten_header_menu > li').on('mouseleave', tenMenuLeave)

  $('.ten_footer_links').find('li h3').append('<a class="toggle" href="" onclick="tenFooterToggle(this);return false"></a>')
  $('.ten_totop').click(tenFooterToTop)

  var oMenu = $('.ten_header_menu').clone()
  oMenu.find('.ten_header_logo').remove()
  oMenu.find('.ten_header_lang').remove()
  oMenu.find('.ten_header_search').remove()
  oMenu.find('li').each(function () {
    if ($(this).find('ul').length > 0) {
      $(this).find('a:first').after('<a href="" class="toggle"></a>')
    }
  })
  $(oMenu).find('.toggle').click(tenMobileMenuToggle)
  $('.ten_mobile_menu').prepend(oMenu)
  $('.ten_mobile_nav').click(tenMobileToggle)
  $('.ten_mobile_search').click(tenMobileSearchToggle)
  tenMenuScroll()
  $(window).bind('scroll', tenMenuScroll)
}

/*====================================================================================================*/
/* Gallery */

/*====================================================================================================*/
function tenGalleryInit () {
  $('.ten_gallery').each(function () {
    if (!$(this).hasClass('inited')) {
      $(this).addClass('inited')
      var iCnt = 0
      $(this).find('.ten_img').each(function () {
        $(this).find('img,.ten_img_mag').click(tenGallery)
        $(this).find('img,.ten_img_mag').css({ 'cursor': 'pointer' })
        $(this).find('img,.ten_img_mag').attr('data-index', iCnt++)
      })
    }
  })

}

/*----------------------------------------------------------------------------------------------------*/
function tenGallery (e) {
  e.stopPropagation()
  e.preventDefault()
  var oRoot = $(e.target).closest('.ten_gallery')
  var oImg = $(e.target).closest('.ten_img').find('img')
  var iIdx = $(oImg).attr('data-index')
  var aSlds = []
  $(oRoot).find('.ten_img').each(function () {
    aSlds.push('<div class="ten_img">' + $(this).html() + '</div>')
  })
  popupSwiper(aSlds, iIdx)
}

/*====================================================================================================*/
/* Sharing */

/*====================================================================================================*/
// function tenShare (e, sType) {
//   e.preventDefault()
//   var sTTL = $('.ten_news_detail').find('h2:first').html()
//   var sSUB = $('.ten_news_detail').find('h6:first').html()
//   var sURL = ('' + window.location)
//   if (sType == 'linkedn') {
//     window.open('https://www.linkedin.com/shareArticle?' + $.param({
//       'url': sURL,
//       'ADTAG': 'linkin',
//       'title': sTTL,
//       'summary': '',
//       'source': 'Tencent'
//     }))
//   }
//   if (sType == 'weibo') {
//     window.open('https://service.weibo.com/share/share.php?' + $.param({
//       'url': sURL,
//       'ADTAG': 'weibo',
//       'title': sTTL,
//       'pic': ''
//     }))
//   }
//   if (sType == 'email') {
//     window.open('mailto:?' + $.param({
//       'subject': sTTL,
//       'body': sSUB + ' ' + sURL
//     }))
//   }
//   if (sType == 'copy') {
//     var sID = 'copy-text-id'
//     var sEnt = ('' + sURL).replace(/[\u00A0-\u9999<>'"\&]/gim, function (i) {
//       return '&#' + i.charCodeAt(0) + ';'
//     })
//     $(e.target).parent().append('<input type="text" name="copy" id="' + sID + '" value="' + sEnt + '" />')
//
//     $('#' + sID).get(0).select()
//     document.execCommand('copy')
//     $('#' + sID).remove()
//     alert('URL copied to clipboard. 网址成功复制到剪贴板')
//   }
// }
//
// function tenShareLinkedin (e) {
//   tenShare(e, 'linkedn')
// }
//
// function tenShareWeibo (e) {
//   tenShare(e, 'weibo')
// }
//
// function tenShareEmail (e) {
//   tenShare(e, 'email')
// }
//
// function tenShareCopy (e) {
//   tenShare(e, 'copy')
// }

/*====================================================================================================*/
/* Home */

/*====================================================================================================*/
function tenHomeInit () {
  $('.ten_home_l a').on('mouseenter', tenHomeOver)
}

function tenHomeOver (e) {
  $('.ten_home .active').removeClass('active')
  var oRoot = $(e.target).closest('a')
  var sTrg = $(oRoot).attr('data-target')
  $(oRoot).addClass('active')
  $('#' + sTrg).addClass('active')
}
/*====================================================================================================*/
/* Event */
/*====================================================================================================*/
function tenEventPop(e){
  e.preventDefault();
  $('.ten_pop').addClass('ten_pop--show');
}
function tenEventHide(e){
  e.preventDefault();
  $('.ten_pop').removeClass('ten_pop--show');
}

/*====================================================================================================*/
/* Accordion */
/*====================================================================================================*/

// function tenAccordion(e){
//   e.preventDefault();
//   $(e.target).closest('.ten_accordion_item').toggleClass('opened');
//   var show =  $(e.target).closest('.ten_accordion_item').hasClass('opened');
//   if(show) {
//     $(e.target).closest('.ten_accordion_item').find('.ten_accordion_body').fadeIn();
//   } else {
//     $(e.target).closest('.ten_accordion_item').find('.ten_accordion_body').fadeOut();
//
//   }
//
// }

function tenQuarter(e){
  e.preventDefault();
  var sHref = $(e.target).attr('href');
  var bFnd  = false;

  $('.ten_investor_quarter_result_block').each(function(){
    if( !bFnd ){
      $(this).show();
    }
    if( $(this).find(sHref).length > 0 ){
      $('html, body').animate({'scrollTop': $(sHref).offset().top - 100 });
      bFnd = true;
    }
  });
}

function tenLazyTag(e){
  e.preventDefault();
  var sHref = $(e.target).attr('data-tag');
  var bFnd  = false;

  $('.gui-lazy-loading:visible').each(function(){
    $(this).find('.gui-lazy-item').each(function(){
      if( !bFnd ){ $(this).show(); }
      // console.log( $(this).attr('data-tag') +' '+sHref)
      if( $(this).attr('data-tag') == sHref ){

        $('html, body').animate({'scrollTop': $(this).offset().top - 100 });
        bFnd = true;
      }
    });
  });

}

/*====================================================================================================*/
/* Year Nav */
/*====================================================================================================*/
function tenYearNavInit(){
  $('.ten_year_nav:not(.inited)').each(function(){
    $(this).addClass('inited');
    var iCnt = $(this).find('a').length;
    var iPg = 5;
    if( iCnt > iPg ){
      $(this).find('a').addClass('item');
      $(this).attr('data-page',0);
      $(this).attr('data-total',Math.ceil(iCnt/iPg));
      $(this).prepend('<a href="#" class="ten_year_prev">&lt;</a>');
      $(this).append('<a href="#" class="ten_year_next">&gt;</a>');
      $(this).find('.ten_year_prev').click(tenYearPrev);
      $(this).find('.ten_year_next').click(tenYearNext);
    }
    tenYearMoveTo(this,0);
  });
}
function tenYearMoveTo(oObj,iM){
  var oRoot = $(oObj).closest('.ten_year_nav');
  var iPage = parseInt($(oRoot).attr('data-page'));
  var iTtl  = parseInt($(oRoot).attr('data-total'));
  var iNew  =  (iPage + iM + iTtl)%iTtl;
  var iPg   = 5;
  var iCnt  = 0; var iS = iNew*iPg; var iE = (iNew+1)*iPg;
  $(oRoot).attr('data-page',iNew);
  $(oRoot).find('a.item').each(function(){
    if( iCnt >= iS && iCnt < iE ){
      $(this).stop().fadeIn();
    }else{
      $(this).hide();
    }
    iCnt++;
  });
}
function tenYearPrev(e){
  if( e ){ e.preventDefault(); }
  tenYearMoveTo(e.target,-1);
}
function tenYearNext(e){
  if( e ){ e.preventDefault(); }
  tenYearMoveTo(e.target,1);
}

/*----------------------------------------------------------------------------------------------------*/
$(document).ready(function () {
  guiSwiperInit()
  guiVideoInit()
  guiTabInit()
  guiCheckboxInit()
  guiLazy(true)
  guiFlip()

  tenMenuInit()
  tenHomeInit()
  tenGalleryInit()
  tenYearNavInit();
  // $('.ten_news_cover_share .linkedin').click(tenShareLinkedin)
  // $('.ten_news_cover_share .weibo').click(tenShareWeibo)
  // $('.ten_news_cover_share .email').click(tenShareEmail)
  // $('.ten_news_cover_share .link').click(tenShareCopy)
  $('.ten_event_pop').click(tenEventPop);
  $('.ten_event_hide').click(tenEventHide);

  if ($('.ten_news_cover_share .wechat').length > 0) {
    $('.ten_news_cover_share .wechat').html('<span id="wechat_share"></span>')
    new QRCode(document.getElementById('wechat_share'), '' + window.location)
  }

  $('.ten_header_menu').find('li').each(function () {
    var sPath = ('' + window.location.pathname).replace(/.*\//gi, '')
    var sHref = $(this).find('a').attr('href')
    if (sHref !== '') {
      if (sPath === sHref) {
        $(this).addClass('active')
      }
      if (sHref === 'newsroom.php' || sHref === 'newsroom_zh.php') {
        if (('' + sPath).match(/(news|media|perspective)/gi)) {
          $(this).addClass('active')
        }
      }
      if (sHref === 'investor_home.php') {
        if (('' + sPath).match(/(investor|financial|conference)/gi)) {
          $(this).addClass('active')
        }
      }
    }
  })

  $('.ten_lang').each(function () {
    var sLoc = window.location
    var sHTML = $('html').attr('lang')
    var sLang = $(this).attr('data-lang')
    var sHref = ('' + sLoc).replace(/\/(en-us|zh-hk|zh-cn)\//gi, '/' + sLang + '/')
    $(this).attr('href', sHref)
    if (('' + sHTML).toLowerCase().indexOf(('' + sLang).toLowerCase()) >= 0) {
      $(this).addClass('active')
    }
  });
  // $('.ten_accordion_item:not(.inited)').each(function(){
  //   $(this).find('.ten_accordion_head').click(tenAccordion);
  //   $(this).addClass('inited');
  // });
  $('.ten_investor_quarter_result_year a:not(.inited)').each(function(){
    $(this).click(tenQuarter);
    $(this).addClass('inited');
  });
  $('a.ten_lazy_tag:not(.inited)').each(function(){
    $(this).click(tenLazyTag);
    $(this).addClass('inited');
  });

  $('.ten_input .clear').click(function(e){
    if( e ){ e.preventDefault(); }
    var oRoot = $(e.target).closest('.ten_input');
    $(oRoot).find('input').val('');
  });
});
