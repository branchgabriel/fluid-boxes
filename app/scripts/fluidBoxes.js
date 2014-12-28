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
      var firstBoxData = {boxNum: 1, leftNeighbor: '', rightNeighbor: ''};
      dust.render(FluidBoxes.boxTemplate, firstBoxData, function(err, out){
        $("#ContentContainer .row").append(out);
      });
    },
    addBox: function(clickedBox) {
      var boxData = FluidBoxes.util.createBoxData(clickedBox);
      dust.render(FluidBoxes.boxTemplate, boxData, function (err, out) {
        clickedBox.after(out);
        clickedBox.find('.pull-right').html(boxData.boxNum);
      });
    }
  },
  util: {
    createBoxData: function (clickedBox) {
      var clickedBoxNum = Number($(clickedBox).closest('.panel-wrapper').attr('data-box-id')),
        newBoxNum = clickedBoxNum + 1,
        modNum = 999;

      FluidBoxes.totalBoxes++;
      return {
        boxNum: newBoxNum,
        leftNeighbor: clickedBoxNum,
        rightNeighbor: '',
        modNum : FluidBoxes.util.calculateModNum(modNum, newBoxNum)
      }
    },
    calculateModNum: function (modNum, newBoxNum) {
      if (FluidBoxes.totalBoxes > FluidBoxes.modPredicate) {
        FluidBoxes.previousPredicate = FluidBoxes.modPredicate;
        FluidBoxes.modPredicate += 6;
      }

      modNum = newBoxNum % FluidBoxes.modPredicate;
      modNum -= FluidBoxes.previousPredicate;
      //console.log(modNum)
      return modNum;
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
