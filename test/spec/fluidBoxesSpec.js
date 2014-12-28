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
      });

      afterEach(function () {
        mockGetDustHtml.restore()
      });

      it('renders base container', function () {
        dustMockReturns(mockGetDustHtml, FluidBoxes.containerTemplate);
        FluidBoxes.init()
        assert.equal($('#BaseContainer').length, 1)
      });

      it('renders content container', function () {
        dustMockReturns(mockGetDustHtml, FluidBoxes.containerTemplate);
        FluidBoxes.init()
        assert.equal($('#ContentContainer').length, 1)
      });
      it('renders first box', function () {
        dustMockReturns(mockGetDustHtml, FluidBoxes.boxTemplate);
        FluidBoxes.init()
        assert.equal($('.box').length, 1)
      });

    });

    describe("first box when clicked", function () {

      it("renders a new box to the right", function (){
        dustMockReturns(mockGetDustHtml, FluidBoxes.containerTemplate);
        dustMockReturns(mockGetDustHtml, FluidBoxes.boxTemplate);

        FluidBoxes.init();

        $('#box_1').click()
        assert.equal($('#box_2').length, 1)
      })

    });
  });
})();
