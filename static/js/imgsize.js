
/*======================================================================*/
/* Img size */
/*======================================================================*/
function imgShowSize(oObj, iW, iH){
  if( $(oObj).hasClass('sized') ){ return; }
  if( !$(oObj).is(':visible') ){ return; }

  var sCSS1 = 'height:0px; width:100%; min-width:120px; position:absolute; z-index:9999;';
  var sCSS2 = 'font-family:arial; font-size:10px; line-height:1.5em; white-space:nowarp; padding:5px; ';
  sCSS2+='border:1px solid #000; background:rgba(255,255,255,0.8); color:#000; ';
  sCSS2+='position:absolute; bottom:0px; ';
  var sHTM = iW+' &times; '+iH;

  $(oObj).addClass('sized');
  $(oObj).after( '<div style="'+sCSS1+'"><div class="sizetag" style="'+sCSS2+'">'+sHTM+'</div></div>' );
}
/* ----------------------------------------------------------------------*/
function imgOnLoad(oObj){
  if( !$(oObj).hasClass('sized') ){
    var iW= $(oObj).width();
    var iH= $(oObj).height();
    if( iW <= 0 || iH <= 0 ){
      $(oObj).attr('onload','imgOnLoad(this)');
    }else{
      iW = iW%2 == 0 ? iW : (Math.round( iW/5) *5);
      iH = iH%2 == 0 ? iH : (Math.round( iH/5) *5);
      imgShowSize(oObj, iW, iH);
    }
  }
}
/*----------------------------------------------------------------------*/
function showImgSize(sQry){
  $(sQry).find('img').each(function(){ imgOnLoad(this); });
}
/*----------------------------------------------------------------------*/
$(document).ready(function(){
  if( (''+window.location).indexOf('showImageSize') >= 0 ){
    showImgSize('body');
  }
});
