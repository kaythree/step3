var grid = angular.module("gridModule",["kendo.directives"]);
angular.module("AngularModule",["gridModule","accordionApp"]);
var accordian = angular.module("accordionApp",[]);

accordian.controller("SummaryController" , function($scope){
	$scope.init = function () {
		$('.sd-block').click(function(){
		   	if(! $(this).hasClass('active') ){
		   		$('.sd-block').removeClass('active');
		   		$(this).addClass('active');
		   		if( $(this).hasClass('summary') ) {
			    	$("#details-grid").removeClass("mytask").addClass("summary");
			    }
			    else if ($(this).hasClass('mytask') ) {
			    	$("#details-grid").removeClass("summary").addClass("mytask");
			    }
		 	}
		});
	}
});

grid.controller("mytaskGridCtrl", function($scope){
	$scope.multiTooltip = "<div class='multi-item'><span class='content'>Multi..</span><span class='icon' style='float: right; cursor:pointer;padding-right: 5px;'><i class='fa fa-ellipsis-v'></i></span>"
	+"<span class='select-group'><span class='arrow'></span><span class='item'><input type='checkbox' name='a1'> Select</span><span class='item'><input type='checkbox' name='a1'> Select</span><span class='item'><input type='checkbox' name='a1'> Select</span><span class='item'><input type='checkbox' name='a1'> Select</span></span></div>";
	$scope.errorMsg = "<div class='error-view'><span class='error-msg'><span></span>error message</span><span class='content'>0123456789</span><span class='exc-icon'>!</span></div>";
	$scope.mainGridOptions = {
		dataSource: [ 
						{ 
							ConsumableGTIN: "123456789876456",
							ProductDescription: "Description Info Here",
							Attribute: "Multi..",
							OrderableGTIN: "0123456789",
							WarehouseGTIN: "0123456789",
							OrdQty: "0000",
							WhsyQty: "0000"
						},
						{ 
							ConsumableGTIN: "123456789876456",
							ProductDescription: "Description Info Here",
							Attribute: "Multi..",
							OrderableGTIN: "0123456789",
							WarehouseGTIN: "0123456789",
							OrdQty: "0000",
							WhsyQty: "0000"
						},
						{ 
							ConsumableGTIN: "123456789876456",
							ProductDescription: "Description Info Here",
							Attribute: "Multi..",
							OrderableGTIN: "0123456789",
							WarehouseGTIN: "0123456789",
							OrdQty: "0000",
							WhsyQty: "0000"
						},
						{ 
							ConsumableGTIN: "123456789876456",
							ProductDescription: "Description Info Here",
							Attribute: "Multi..",
							OrderableGTIN: "0123456789",
							WarehouseGTIN: "0123456789",
							OrdQty: "0000",
							WhsyQty: "0000"
						},
						{ 
							ConsumableGTIN: "123456789876456",
							ProductDescription: "Description Info Here",
							Attribute: "Multi..",
							OrderableGTIN: "0123456789",
							WarehouseGTIN: "0123456789",
							OrdQty: "0000",
							WhsyQty: "0000"
						}
					],
		height: 180,
		sortable: true,
		selectable: "row",
		scrollable: false,
		columnMenu: {
			columns: false,
			sortable: true
		},
		filterable: {
			extra: false,
			mode: "menu"
        },
		pageable: {
			refresh: false,
			pageSizes: true,
			buttonCount: 2,
			pageSize: 5,
			info: true,
			messages: {
			  display: " {5}"
			}
		},
		dataBound: function() {
			this.expandRow(this.tbody.find("tr.k-master-row").first());
		},
		columns: [
		{
			field: "ConsumableGTIN",
			title: "Consumable GTIN",
			width: 200
		}, {
			field: "ProductDescription",
			title: "Product Description"
		}, {
			field: "Attribute",
			title: "Attribute",
			template:kendo.template($scope.multiTooltip)
		}, {
			field: "OrderableGTIN",
			title: "Orderable GTIN",
			template:kendo.template($scope.errorMsg)
		}, {
			field: "WarehouseGTIN",
			title: "Warehouse GTIN",
			template:kendo.template($scope.errorMsg)
		}, {
			field: "OrdQty",
			title: "Ord. Qty"
		}, {
			field: "WhsyQty",
			title: "Whsy. Qty"
		}],
		dataBinding: function(e) {
				var $pagerRefresh = $('.k-pager-refresh').clone();
				var $grid = $('#details-grid.mytask');
				//$('.k-pager-refresh').remove();
				$grid.find('.k-grid-header tr th:first-child').prepend($pagerRefresh);

				$grid.find('.k-pager-wrap').wrapInner('<div class="k-pager-innerwrap"></div>');

				$grid.on('click','.scheck',function(){
					if( this.checked ){
						$(this).closest('tr').addClass('active');
						$('.approval-buttons').addClass('active');
					} else {
						$(this).closest('tr').removeClass('active');
						if( $('.scheck:checked').length == 0 ) {
							$('.approval-buttons').removeClass('active');
						}
					}
				})
				
				$grid.on('click','.comment-btn',function(){		
					$('.commentbox,.sm-overlay').show();
					$('.sm-overlay,.sum-lightbox .buttons button').click(function(){
						$('.commentbox,.sm-overlay').hide()
					})
				});

				$grid.on('click','.multi-item .icon',function(){
					$(".select-group").hide();
					$(".multi-item").parent().css({background: '#FFFFFF', border: '1px solid #e5e5e5'});
					$(this).parent(".multi-item").find(".select-group").css({top: $(this).offset().top-55, left: $(this).offset().left-10});
					$(this).parent(".multi-item").find(".select-group").show();
					$(this).parent(".multi-item").parent().css({background: '#b5d8f2', border: '1px solid yellow'});
				});

				$grid.on('mouseover','.error-view',function(){
					$(".error-msg").hide();
					$(this).find(".error-msg").css({top: $(this).offset().top-40, left: $(this).offset().left+185});
					$(this).find(".error-msg").show();
				});

				$grid.on('mouseout','.error-view',function(){
					$(this).find(".error-msg").hide();
				});

		}
	};

	
});
