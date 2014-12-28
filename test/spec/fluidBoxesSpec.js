function mockGetDustHtml(template) {
  sinon.stub(FluidBoxes.server, 'getDustHtml').returns(__html__['dust_source/'+template+'.html']);
}
(function () {
  'use strict';

  describe('FluidBoxes', function () {
    describe('init', function () {
      beforeEach(function () {
        document.body.innerHTML = __html__['index.html'];
        mockGetDustHtml(FluidBoxes.containerTemplate);
      });

      afterEach(function () {
        fixture.cleanup();
      });

      it('renders containers', function () {
        FluidBoxes.init();
        assert.equal($('#BaseContainer').length, 1)
        assert.equal($('#ContentContainer').length, 1)
      });
    });
  });
})();
