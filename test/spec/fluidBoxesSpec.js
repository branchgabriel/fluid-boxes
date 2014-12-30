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
        dustMockReturns(mockGetDustHtml, FluidBoxes.dashTemplate);
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

      it('renders the dashboard', function () {
        assert($('.dashboard').length,1)
      })

    });

    describe("creating 22 boxes", function () {

      beforeEach(function () {
        FluidBoxes.totalBoxes = 1
        FluidBoxes.modPredicate = 6
        FluidBoxes.previousPredicate = 0
        var boxesToTest = 21,
          index = 0;
        while(index++ != boxesToTest){
          $('#box_'+index).click()
        }
      })

      it("1st box has col 4", function () {
        assert.equal($('#box_1').hasClass('col-md-4'), true)
      })

      it("renders a new box to the right of box 1", function (){
        assert.equal($('#box_2').length, 1)
      })

      it("2nd box has next number of 2", function () {
        assert.equal($('#box_2 .panel-title .boxNum').html(), "2")
      })

      it("2nd box has left neighbor of 1", function () {
        assert.equal($('#box_2 .panel-body .pull-left').html(), 1)
      })

      it("2nd box has col 4", function () {
        assert.equal($('#box_2').hasClass('col-md-4'), true)
      })

      it("1st box now has right neighbor of 2", function () {
        assert.equal($('#box_1 .panel-body .pull-right').html(), 2)
      })

      it("2nd box has blue background class", function(){
        ($('#box_2 .panel-body').hasClass("background_2")).should.be.equal(true)
      })

      it("3rd box has green background class", function(){
        ($('#box_3 .panel-body').hasClass("background_3")).should.be.equal(true)
      })

      it("4th box has blue background class", function(){
        ($('#box_4 .panel-body').hasClass("background_4")).should.be.equal(true)
      })

      it("4th box has blue background class", function(){
        assert.equal($('#box_4').hasClass('col-md-6'), true)
      })

      it("6th box has col 12", function () {
        assert.equal($('#box_6').hasClass('col-md-12'), true)
      })

      it("8th box has blue background class", function(){
        ($('#box_8 .panel-body').hasClass("background_2")).should.be.equal(true)
      })

      it("9th box has blue background class", function(){
        ($('#box_9 .panel-body').hasClass("background_3")).should.be.equal(true)
      })

      it("10th box has blue background class", function(){
        ($('#box_10 .panel-body').hasClass("background_4")).should.be.equal(true)
      })

      it("12th box has col 12", function () {
        assert.equal($('#box_12').hasClass('col-md-12'), true)
      })

      it("14th box has blue background class", function () {
        ($('#box_14 .panel-body').hasClass("background_2")).should.be.equal(true)
      })

      it("15th box has blue background class", function () {
        ($('#box_15 .panel-body').hasClass("background_3")).should.be.equal(true)
      })

      it("16th box has blue background class", function () {
        ($('#box_16 .panel-body').hasClass("background_4")).should.be.equal(true)
      })

      it("20th box has blue background class", function () {
        ($('#box_20 .panel-body').hasClass("background_2")).should.be.equal(true)
      })

      it("21st box has blue background class", function () {
        ($('#box_21 .panel-body').hasClass("background_3")).should.be.equal(true)
      })

      it("22nd box has blue background class", function () {
        ($('#box_22 .panel-body').hasClass("background_4")).should.be.equal(true)
      })

      it("22nd box has right neighbor of nothing", function () {
        assert.equal($('#box_22 .panel-body .pull-right').html(), '')
      })

      it("22nd box has highlight focus", function () {
        assert.equal($('.focus').length, 1)
      })

      it("21st box will not call addBox when clicked", function () {
        var addBoxSpy = sinon.spy(FluidBoxes.view,"addBox");
        $('#box_22').click()
        assert(addBoxSpy.called,false)
        addBoxSpy.restore();
      })

      describe("deleting boxes", function () {
        beforeEach(function () {
          $('div#box_1').find('.deleteBox').click()
          $('div#box_23').find('.deleteBox').click()
        })

        it("1st box will delete when clicked", function () {
          assert.equal($('#box_1').length, 0)
        })

        it("2nd box will update left neighbor after 1st box delete", function () {
          assert.equal($('#box_2 .panel-body .pull-left').html(), '')
        })

        it("2nd box will update right neighbor after 1st box delete", function () {
          assert.equal($('#box_2 .panel-body .pull-right').html(), 3);
        })

        it("22nd box will update left neighbor after last box delete", function () {
          assert.equal($('#box_22 .panel-body .pull-left').html(), 21);
        })

        it("22nd box will update right neighbor after last box delete", function () {
          assert.equal($('#box_22 .panel-body .pull-right').html(), '')
        })

        it("boxes count is correct", function () {
          assert.equal($('#totalBoxes').text(), '21')
        })

      })

    });
  });
})();
