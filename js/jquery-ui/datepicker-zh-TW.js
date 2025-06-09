/* Chinese initialisation for the jQuery UI date picker plugin. */
/* Written by Ressol (ressol@gmail.com). */
( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "../widgets/datepicker" ], factory );
	} else {

		// Browser globals
		factory( jQuery.datepicker );
	}
}( function( datepicker ) {

datepicker.regional[ "zh-TW" ] = {
	closeText: "關閉",
	prevText: "&#x3C;上個月",
	nextText: "下個月&#x3E;",
	currentText: "今天",
	monthNames: [ "一月","二月","三月","四月","五月","六月",
	"七月","八月","九月","十月","十一月","十二月" ],
	monthNamesShort: [ "一月","二月","三月","四月","五月","六月",
	"七月","八月","九月","十月","十一月","十二月" ],
	dayNames: [ "星期日","星期一","星期二","星期三","星期四","星期五","星期六" ],
	dayNamesShort: [ "週日","週一","週二","週三","週四","週五","週六" ],
	dayNamesMin: [ "日","一","二","三","四","五","六" ],
	weekHeader: "週",
	dateFormat: "yy/mm/dd",
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: true,
	yearSuffix: "年" };
datepicker.setDefaults( datepicker.regional[ "zh-TW" ] );

return datepicker.regional[ "zh-TW" ];

} ) );



// hack to add clear button
// 增加清除按鈕 -Start (Ref. http://bugs.jqueryui.com/ticket/3999)
//wrap up the redraw function with our new shiz
var dpFunc = $.datepicker._generateHTML; //record the original
$.datepicker._generateHTML = function (inst) {
   var thishtml = $(dpFunc.call($.datepicker, inst)); //call the original
       thishtml = $('<div />').append(thishtml); //add a wrapper div for jQuery context
        //locate the button panel and add our button - with a custom css class.
       $('.ui-datepicker-buttonpane', thishtml).append(
          $('<button class=\"ui-datepicker-clear ui-state-default ui-priority-primary ui-corner-all\">Clear</button>' )
          .click(function () {
             inst.input.val("");
             inst.input.datepicker('hide');     
           })
         );
 
       thishtml = thishtml.children(); //remove the wrapper div
       return thishtml; //assume okay to return a jQuery
};
// 增加清除按鈕 -End