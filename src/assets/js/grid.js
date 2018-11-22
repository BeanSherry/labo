;(function($, window, document, undefined){
  var pluginName = 'pinterest_grid';
  var defaults = {
    marginX: 10,
    marginY: 20,
    column: 4,
    margin_bottom: 50,
    single_column_breakpoint:100
  };
  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options) ;
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }
  Plugin.prototype.init = function () {
      this.make_layout_change(this);
  };
  Plugin.prototype.calculate = function (single_column_mode) {
      var self = this;
      var $container = $(this.element);
      var container_width =self.options.width|| $container.width();
      var $article = $(this.element).children();
      var columnHeight=new Array(self.options.column);
      var row=new Array(self.options.column);

      if(single_column_mode === true) {
        article_width = container_width - self.options.marginX;
      } else {
        article_width = (container_width - self.options.marginX * (self.options.column-1)) / self.options.column;
      }
      $article.each(function() {
          $(this).css('width', article_width);
      });
      for(var i=0;i<self.options.column;i++){
          row[i]=0;
          columnHeight[i]=0;
      }
      $article.each(function(index,el){
          if(index<self.options.column){
              columnHeight[index]=$(el).outerHeight();
              $(el).css({
                  position:'absolute',
                  opacity:1,
                  left:article_width * index +index%self.options.column *self.options.marginX
              })
          }else{
              //获取高度最小的列
              var minHeight=Math.min.apply(null,columnHeight);
              var minIndex=columnHeight.indexOf(minHeight);
              $(el).css({
                  position:'absolute',
                  opacity:1,
                  top:columnHeight[minIndex] +(row[minIndex] +1)*self.options.marginY ,
                  left:article_width * minIndex +minIndex%self.options.column *self.options.marginX
              })
              columnHeight[minIndex]+=$(el).outerHeight();
              row[minIndex]+=1;
          }

      })
      $container.css('height', Math.max.apply(null,columnHeight)+self.options.marginY *Math.max.apply(null,row)+self.options.margin_bottom);
      $(window).resize();
  };
  Plugin.prototype.make_layout_change = function (_self) {
      if($(window).width() < _self.options.single_column_breakpoint) {
          _self.calculate(false);
      } else {
          _self.calculate(false);
      }
  };
  $.fn[pluginName] = function (options) {
      return this.each(function () {
        new Plugin(this, options);
        //   if (!$.data(this, 'plugin_' + pluginName)) {
        //       $.data(this, 'plugin_' + pluginName,
        //       new Plugin(this, options));
        //   }
      });
  }
 })(jQuery,window, document)
