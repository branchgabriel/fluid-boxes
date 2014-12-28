var mockGetDustHtml;
function dustMockReturns(mockGetDustHtml, template) {
  mockGetDustHtml.withArgs('dust_source/'+template+'.html').returns(__html__['dust_source/' + template + '.html']);
}
(function () {
  'use strict';

  describe('FluidBoxes', function () {
    describe('init', function () {

      beforeEach(function () {
        document.body.innerHTML = __html__['index.html'];
        mockGetDustHtml = sinon.stub(FluidBoxes.server, 'getDustHtml');
        dustMockReturns(mockGetDustHtml, FluidBoxes.containerTemplate);
        dustMockReturns(mockGetDustHtml, FluidBoxes.boxTemplate);
        FluidBoxes.init();
      });

      afterEach(function () {
        mockGetDustHtml.restore()
      });

      it('renders base container', function () {
        assert.equal($('#BaseContainer').length, 1)
      });

      it('renders content container', function () {
        assert.equal($('#ContentContainer').length, 1)
      });
      it('renders first box', function () {
        assert.equal($('.box').length, 1)
      });

    });

    describe("first box when clicked", function () {

      beforeEach(function () {
        $('#box_1').click()
      })

      it("renders a new box to the right", function (){
        assert.equal($('#box_2').length, 1)
      })

      it("the box has next number of 2", function () {
        assert.equal($('#box_2 .panel-title').html(), 2)
      })

      it("the box has left neighbor of 1", function () {
        assert.equal($('#box_2 .panel-body .pull-left').html(), 1)
      })

      it("the box has right neighbor of nothing", function () {
        assert.equal($('#box_2 .panel-body .pull-right').html(), '')
      })

      it("has the correct background class", function(){
        ($('#box_2 .panel-body').hasClass("background_2")).should.be.equal(true)
      })

    });
  });
})();
