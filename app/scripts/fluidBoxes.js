var FluidBoxes = {
  containerTemplate:'containers',
  containerTemplateFile:'',
  boxTemplate:'box',
  init:function(){
    debugger;
    FluidBoxes.templates.compileAndLoad('dust_source/'+FluidBoxes.containerTemplate+'.html', FluidBoxes.containerTemplate);
    FluidBoxes.view.addContainers();
    FluidBoxes.events.bindBoxes()
  },
  events:{
    bindBoxes: function(){
      $('#ContentContainer').on('click','box',function(evt){
       // FluidBoxes.view.addBox($(evt.target))
      })
    }
  },
  view:{
    addContainers: function(){
      dust.render(FluidBoxes.containerTemplate, {}, function(err, out){
        $("body").append(out);
      });
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

}/**
 * Created by gabriel on 12/27/14.
 */
