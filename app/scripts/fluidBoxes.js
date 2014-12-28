var FluidBoxes = {
  containerTemplate:'containers',
  boxTemplate:'box',
  init:function(){
    FluidBoxes.templates.compileAndLoad('dust_source/'+FluidBoxes.containerTemplate+'.html', FluidBoxes.containerTemplate);
    FluidBoxes.templates.compileAndLoad('dust_source/'+FluidBoxes.boxTemplate+'.html', FluidBoxes.boxTemplate);
    FluidBoxes.view.addContainers();
    FluidBoxes.view.addFirstBox();
    FluidBoxes.events.bindBoxes();
  },
  events:{
    bindBoxes: function(){
      $('#ContentContainer').on('click','.panel',function(evt){
        FluidBoxes.view.addBox($(evt.target))
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
    addBox: function(clickedBox){
      dust.render(FluidBoxes.boxTemplate, FluidBoxes.util.createBoxData(clickedBox), function(err, out){
        clickedBox.closest('.panel-wrapper').after(out);
      });
    }
  },
  util: {
    createBoxData: function (clickedBox) {
      var clickedBoxNum = Number($(clickedBox).closest('.panel-wrapper').attr('data-box-id'));
      return {
        boxNum: clickedBoxNum + 1,
        leftNeighbor: clickedBoxNum,
        rightNeighbor: clickedBoxNum - 1
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
