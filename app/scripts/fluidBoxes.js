var FluidBoxes = {
  containerTemplate:'containers',
  boxTemplate:'box',
  totalBoxes:1,
  modPredicate : 6,
  previousPredicate : 0,
  init:function(){
    FluidBoxes.templates.compileAndLoad('dust_source/'+FluidBoxes.containerTemplate+'.html', FluidBoxes.containerTemplate);
    FluidBoxes.templates.compileAndLoad('dust_source/'+FluidBoxes.boxTemplate+'.html', FluidBoxes.boxTemplate);
    FluidBoxes.view.addContainers();
    FluidBoxes.view.addFirstBox();
    FluidBoxes.events.bindBoxes();
  },
  events:{
    bindBoxes: function(){
      $('#ContentContainer').on('click','.panel-wrapper:last',function(evt){
        FluidBoxes.view.addBox($(evt.target).closest('.panel-wrapper'))
      })

    }
  },
  view:{
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
        clickedBox.find('.pull-right').html(boxData.boxNum);
        clickedBox.find('.focus').removeClass('focus');
      });
    }
  },
  util: {
    createBoxData: function (clickedBox) {
      var clickedBoxNum = Number($(clickedBox).closest('.panel-wrapper').attr('data-box-id')),
        newBoxNum = clickedBoxNum + 1;



      FluidBoxes.totalBoxes++;
      return {
        boxNum: newBoxNum,
        leftNeighbor: clickedBoxNum,
        rightNeighbor: '',
        modNum : FluidBoxes.util.calculateModNum(newBoxNum),
        colNum : FluidBoxes.util.calculateColNum(clickedBox, newBoxNum)
      }
    },
    calculateModNum: function (newBoxNum) {
      if (FluidBoxes.totalBoxes > FluidBoxes.modPredicate) {
        FluidBoxes.previousPredicate = FluidBoxes.modPredicate;
        FluidBoxes.modPredicate += 6;
      }

      var modNum = newBoxNum % FluidBoxes.modPredicate;
      modNum -= FluidBoxes.previousPredicate;
      //console.log(modNum)
      return modNum;
    },
    calculateColNum: function (clickedBox, newBoxNum) {
      if ((
          $(clickedBox).hasClass('col-md-4')
          &&
          $(clickedBox).prev().hasClass('col-md-4')
          &&
          $(clickedBox).prev().prev().hasClass('col-md-4'))
        ||
        (
          $(clickedBox).hasClass('col-md-6')
          &&
          $(clickedBox).prev().hasClass('col-md-4')
        )) {
        return 6;
      } else if(newBoxNum % 6 == 0) {
        return 12;
      } else {
        return 4;
      }
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
