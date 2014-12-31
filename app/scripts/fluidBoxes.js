var FluidBoxes = {
  containerTemplate:'containers',
  boxTemplate:'box',
  dashTemplate:'dashboard',
  replaying:true,
  lastUsedBoxId:1,
  clicks:[],
  modPredicate : 6,
  previousPredicate : 0,
  init:function(){
    FluidBoxes.templates.compileAndLoad('dust_source/'+FluidBoxes.containerTemplate+'.html', FluidBoxes.containerTemplate);
    FluidBoxes.templates.compileAndLoad('dust_source/'+FluidBoxes.boxTemplate+'.html', FluidBoxes.boxTemplate);
    FluidBoxes.templates.compileAndLoad('dust_source/'+FluidBoxes.dashTemplate+'.html', FluidBoxes.dashTemplate);
    FluidBoxes.view.addContainers();
    FluidBoxes.view.loadDashboard();
    FluidBoxes.view.addFirstBox();
    FluidBoxes.events.bindBoxes();
    FluidBoxes.events.bindDelete();
    FluidBoxes.util.loadClicks();
    FluidBoxes.util.replayClicks();
  },
  events:{
    bindBoxes: function(){
      $('#ContentContainer').on('click','.panel-wrapper',function(evt){
        FluidBoxes.view.addBox($(evt.target).closest('.panel-wrapper'))
        FluidBoxes.view.updateBoxesTotal();
        FluidBoxes.view.updateContentContainerBackgroundColor();
        FluidBoxes.util.updateBoxesData();
      })
    },
    bindDelete: function () {
      $('#ContentContainer').on('click','.deleteBox',function(evt){
        evt.stopPropagation();
        FluidBoxes.view.deleteBox($(evt.target).closest('.panel-wrapper'))
        FluidBoxes.view.incrementDeleteTotal();
        FluidBoxes.view.updateBoxesTotal();
        FluidBoxes.view.updateContentContainerBackgroundColor();
        FluidBoxes.util.updateBoxesData();
      })
    }
  },
  view:{
    updateFocus:function(){
      $('.panel').removeClass('focus');
      $('.panel:last').addClass('focus');
    },
    updateContentContainerBackgroundColor: function () {
      var r = 75, g = 75, b = 75, totalBoxes = $('.panel-wrapper').length;
      function color(r,g,b){
        return 'rgb('+r+','+g+','+b+')';
      }
      if(75 - totalBoxes > 0){
        $('#ContentContainer').css('background' , color(r-(totalBoxes),g-(totalBoxes),b-(totalBoxes)));
      }
    },
    loadDashboard: function () {
      dust.render(FluidBoxes.dashTemplate,{}, function (err, out) {
        $('#pageTitle').after(out)
      });
    },
    updateBoxesTotal: function () {
      $('#totalBoxes').text($('.panel-wrapper').length)
    },
    incrementDeleteTotal: function () {
      var currentTotal = Number($('#totalDeletes').text());
      $('#totalDeletes').text(currentTotal+=1);
    },
    addContainers: function(){
      dust.render(FluidBoxes.containerTemplate, {}, function(err, out){
        $("body").append(out);
      });
    },
    addFirstBox: function(){
      var firstBoxData = {boxNum: 1, leftNeighbor: '', rightNeighbor: '', colNum:4};
      dust.render(FluidBoxes.boxTemplate, firstBoxData, function(err, out){
        $("#ContentContainer .row").append(out);
      });
    },
    addBox: function(clickedBox) {
      var boxData = FluidBoxes.util.createBoxData(clickedBox);
      dust.render(FluidBoxes.boxTemplate, boxData, function (err, out) {
        clickedBox.after(out);
        clickedBox.find('div.panel-body .pull-right').html(boxData.boxNum);
        FluidBoxes.view.updateFocus()
        FluidBoxes.util.recordAction(boxData.leftNeighbor, 'add')
      });
    },
    deleteBox: function(clickedBox){
      var clickedBoxNum = Number($(clickedBox).attr('data-box-id'));
      FluidBoxes.util.updateClickedBoxNeighborData(clickedBox);
      $(clickedBox).remove();
      FluidBoxes.view.showSuccess("You deleted box: "+clickedBoxNum+" <br/> The world is now a cleaner place thanks you!")
      FluidBoxes.view.updateFocus()
      FluidBoxes.util.recordAction(clickedBoxNum,'delete');
    },
    showSuccess: function (message) {
      var successAlertSelector = "#alertDiv";
      FluidBoxes.view.showAlert(successAlertSelector, 'success');
      FluidBoxes.view.updateAlertMessage(successAlertSelector, message);
    },
    updateAlertMessage: function (elementToUpdate, message) {
      if ($.trim(message).length !== 0) {
        $(elementToUpdate).html(message);
      }
    },
    showAlert: function (wrapper, alertType) {
      var $message = $(wrapper);
      $message.text($message.text());
      $message.css({"opacity": "1", "z-index": "2000"});
      $message.removeClass('alert-success');
      if(alertType) {
        $message.addClass('alert-' + alertType);
      }
      if (Modernizr.csstransitions === false) {
        $message.show();
      }
      setTimeout(function () {
        $message.css({"opacity": "0"});

        if (Modernizr.csstransitions === false) {
          $message.hide();
        }
      }, 5000);
    }
  },
  util: {
    replayClicks: function () {
      for(var click in FluidBoxes.clicks){
        FluidBoxes.replaying = true;
        var boxToClick = FluidBoxes.clicks[click];
        if(boxToClick.action === "add"){
          $('#box_'+boxToClick.boxNum).click()
        } else {
          $('#box_'+boxToClick.boxNum).find('.deleteBox').click()
        }
      }
      FluidBoxes.replaying = false;
    },
    loadClicks: function () {
      FluidBoxes.clicks = JSON.parse(localStorage.getItem('clicks') || []);
    },
    saveClicks: function () {
      localStorage.setItem('clicks', JSON.stringify(FluidBoxes.clicks));
    },
    recordAction: function (boxNum, addDelete) {
      if(!FluidBoxes.replaying){
        FluidBoxes.clicks.push({'action':addDelete, 'boxNum': boxNum})
        FluidBoxes.util.saveClicks();
      }
    },
    createBoxData: function (clickedBox) {
      var $clickedBox = $(clickedBox),
        clickedBoxNum = Number($clickedBox.closest('.panel-wrapper').attr('data-box-id'));
      FluidBoxes.lastUsedBoxId+=1;
      return {
        boxNum: FluidBoxes.lastUsedBoxId,
        leftNeighbor: clickedBoxNum,
        rightNeighbor: $clickedBox.next().attr('data-box-id') || ''
      }
    },
    updateBoxesData: function(){
      $('.panel-wrapper').each(function(index){
        var $thisBox = $(this);
        $thisBox.attr('data-box-index',index+1);
        FluidBoxes.modPredicate = 6;
        var backgroundClass = 'background_'+FluidBoxes.util.calculateModNum(index+1);
        var columnClass = 'col-md-'+FluidBoxes.util.calculateColNum($thisBox, index+1);

        $thisBox.removeClass('col-md-4 col-md-6 col-md-12').addClass(columnClass)

        $thisBox.find('.panel-heading').removeClass('background_2 background_3 background_4')
        $thisBox.find('.panel-body').removeClass('background_2 background_3 background_4')

        if(FluidBoxes.util.hasExistingBackground(backgroundClass)){
          $thisBox.find('.panel-heading').addClass(backgroundClass);
          $thisBox.find('.panel-body').addClass(backgroundClass);
        }
        var previousBoxId = $thisBox.prev().attr('data-box-id');
        $thisBox.find('.panel-body .pull-left').html(previousBoxId)

      })
    },
    hasExistingBackground: function (backgroundClass) {
      return backgroundClass == 'background_2'
        || backgroundClass == 'background_3'
        || backgroundClass == 'background_4';
    },
    calculateModNum: function (boxIndex) {
      return boxIndex % FluidBoxes.modPredicate;
    },
    calculateColNum: function (box, boxIndex) {
      var $box = $(box);
      if(boxIndex % 6 == 0) {
        return 12;
      } else if(
        FluidBoxes.util.isMiddleRowBox($box)
      ){
        return 6;
      } else {
        return 4;
      }
    },
    isMiddleRowBox: function ($box) {
      return ($box.prev().hasClass('col-md-4') && $box.prev().prev().hasClass('col-md-4') && $box.prev().prev().prev().hasClass('col-md-4')  )
        ||
        ($box.prev().hasClass('col-md-6') && $box.prev().prev().hasClass('col-md-4'))
        ||
        ($box.prev().hasClass('col-md-4') && $box.next().hasClass('col-md-12'))
        ||
        ($box.next().hasClass('col-md-12') );
    },
    updateClickedBoxNeighborData: function(clickedBox){
      var previousBoxNum = $(clickedBox).prev().find('.boxNum').html(),
        nextBoxNum = $(clickedBox).next().find('.boxNum').html();
      $(clickedBox).prev().find('.panel-body .pull-right').html(nextBoxNum || '');
      $(clickedBox).next().find('.panel-body .pull-left').html(previousBoxNum || '');
    }

  },
  templates:{
    compileAndLoad: function(url, name){
      var fileToCompile = FluidBoxes.server.getDustHtml(url);
      if(fileToCompile){
        dust.loadSource(dust.compile(fileToCompile, name));
      }
    }
  },
  server:{
    getDustHtml: function(url){
      var templateHtml = null;
      $.ajax({url:url, success:function(data) {
        templateHtml = data;
      },async:false});
      return templateHtml
    }
  }
}
