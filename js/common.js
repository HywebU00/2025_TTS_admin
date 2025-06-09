
var contextPath = "";
var currentScrollHeight;  

/**
 * set UI Form placeholder attr
 * @param objSelector 依據的selector
 */
function setFormPlaceholderValue(objSelector) {
   if ($(objSelector)) {
      $(objSelector).each(function(index) {
            var inpId = $(this).attr("for");
            var objAry = inpId.split(",");
            for(var i=0;i<objAry.length;i++){
	            var obj = objAry[i];
              if (obj != "" && ($("#" + obj).attr("placeholder") == "" || $("#" + obj).attr("placeholder") == undefined)) {
                $("#" + obj).attr("placeholder", "請輸入" + $(this).text().replace(/\*|：/g, ""));
              }
            }

       });
    }
}

/**
 * set UI input required by necessary class
 */
function setFormRequired() {
    $(".necessary").parents(".form_grp").find("input,select,textarea").each(function() {
        if ($(this).attr("type") != "hidden" && $(this).attr("type") != "file" ) {
            try {
                var id = $(this).attr("id");
                if ($("#" + id).length >0) {
                    $("#" + id).rules("add", {
                        required: true
                    });
                }
            }catch(E) {
              console.log($(this).attr("id")+".."+E);
            }
        }
    });
}

function setFormErrorRest(objId){
  var obj = $("#"+objId);
  if(obj){
  	$("#"+objId+"-error").remove();  	
  	$("#"+objId).removeClass("error");  	
    //obj.closest("div.form_grp").removeClass("has-danger");
    //obj.closest("div.form_content").removeClass("form-control-danger");
    //obj.closest(".form-control-feedback").remove();
    obj.focus();	
  }
}

function setFormError(objId,msg){
  var obj = $("#"+objId);
  if(obj){
  	$("#"+objId+"-error").remove();  	
  	$("#"+objId).addClass("error");  	
    //obj.closest("div.form_grp").addClass("has-danger");
    obj.closest("div.form_content")
       .addClass("form-control-danger").append($('<div>', {id: objId+"-error",class:"notice_warning" ,html: msg}));
    obj.focus();	
  }
}

function addNecessary(objId){
  var obj = $("#"+objId);
  if(obj){
  	 if(obj.parents(".form_grp").find(".necessary").length==0){
      obj.parents(".form_grp").find(".form_title").prepend("<abbr class=\"necessary\">*</abbr>");	
    }
  }
}

function removeNecessary(objId){
  var obj = $("#"+objId);
  if(obj){
     obj.parents(".form_grp").find(".necessary").remove();	
  }
}


//mask page and show 處理中
function doMask() {
	doMaskContent("處理中...");
}
//mask page and have message
function doMaskContent(msgText){	
    if ($("#modelFormMask-overlay").length > 0) {
        $("#modelFormMask-overlay").remove();
    }

    var divE = $('<div>', {
        id: 'modelFormMask-overlay',
        html: '<div style="text-align:center;width:100%;top:40%;font-weight:bolder;position: fixed;left:0;right:0;display:block;z-index:999999;color:white;font-size:2em;text-shadow: black 0.1em 0.1em 0.2em;">'+msgText+'</div>' ,
        class:'modal_overlay',
        style: ""
    });
    $("body").append(divE);
}


function doFinder(titleText, url, ww, hh) {	  
	  $("body").css("overflow","hidden");
    //top:"+(currentScrollHeight-hh-400)+"px;
    var h = hh.toString().indexOf("%")>-1 ? hh : hh + "px";
    var cssStle = ""; //'width:' + ww + '%;height:' + h + ";top:1em;margin-left:0px;left:"+(100-ww)/2+"%;";

    if ($("#modelFormMask").length > 0) {
        $("#modelFormMask").remove();
        $("#modelFormMask-overlay").remove();
    }
    
    var he = hh.toString().indexOf("%")>-1 ? "100%" : (hh - 110) + "px";
    var h3E = $('<h2>', {
        html: titleText
    });
    var dif = $('<iframe>', {
        src: url,
        name:"modalIfameADM",
        style: 'width:100%;height:100%;border-width:0px;'
    });
    var pE = $('<div>', {
        class: 'layout',
        style: 'width:100%;height:100%;'
    });
    pE.append(dif);
    var divE = $('<div>', {
        id: 'modelFormMask',
        class: 'modal',
        style: cssStle
    });
    divE.append(h3E).append(pE);
    $("body").append(divE);
        
    $("#modelFormMask").prepend('<button type="button" class="close">關閉</button>');

    $("#modelFormMask").after('<div id="modelFormMask-overlay" class="modal_overlay"></div>');
    $("#modelFormMask").show();
    $("#modelFormMask-overlay").show();

    $("#modelFormMask-overlay").bind("click", function() {doRedirect();closeModal();}) 
    $("#modelFormMask button.close").bind("click", function() {doRedirect();closeModal();})
}

function doFinderT(titleText, url, data, ww, hh) {	  
	  $("body").css("overflow","hidden");
    //top:"+(currentScrollHeight-hh-400)+"px;
    var h = hh.toString().indexOf("%")>-1 ? hh : hh + "px";
    var cssStle = 'width:' + ww + '%;height:' + h + ";top:1em;margin-left:0px;left:"+(100-ww)/2+"%;";

    if ($("#modelFormMask").length > 0) {
        $("#modelFormMask").remove();
        $("#modelFormMask-overlay").remove();
    }
    
    var he = hh.toString().indexOf("%")>-1 ? "100%" : (hh - 110) + "px";
    var h3E = $('<h2>', {
        html: titleText
    });
    var dif = $('<iframe>', {
        src: url,
        data: data,
        style: 'width:98%;height:'+he+';border-width:0px;'
    });
    var pE = $('<div>', {
        class: 'layout',
        style: 'width:100%;height:'+he+';'
    });
    pE.append(dif);
    var divE = $('<div>', {
        id: 'modelFormMask',
        class: 'modal',
        style: cssStle
    });
    divE.append(h3E).append(pE);
    $("body").append(divE);
        
    $("#modelFormMask").prepend('<button type="button" class="close">關閉</button>');

    $("#modelFormMask").after('<div id="modelFormMask-overlay" class="modal_overlay"></div>');
    $("#modelFormMask").show();
    $("#modelFormMask-overlay").show();

    $("#modelFormMask-overlay").bind("click", function() {closeModal();}) 
    $("#modelFormMask button.close").bind("click", function() {closeModal();})
}

//close Modal
function closeModal() {
    $("body").removeClass("noscroll");
    $("body").css("overflow","");
    if ($("#modelFormMask-overlay").length > 0) {
        $("#modelFormMask-overlay").remove();
    }
    if ($("#modelFormMask").length > 0) {
        $("#modelFormMask").remove();
    }
    if ($.isFunction(window.afertCloseModal)) {
      afertCloseModal();
    }
}

function doRedirect(){
	if($("iframe[name='modalIfameADM']").contents().find('#parent-redirect-url').val() != undefined && 
		$("iframe[name='modalIfameADM']").contents().find('#parent-redirect-url').val() != ''){
		window.location.href = $("iframe[name='modalIfameADM']").contents().find('#parent-redirect-url').val();
	}
}

var FormUtil = {};
FormUtil.Message = {};
FormUtil.MessageQueue = new Array();
FormUtil.Message = function(objID, message) {
    var span = document.createElement("div");
    span.id = "id-error";
    span.className = "form-control-feedback";
    span.innerHTML = message;
    try {
        var obj = $("#" + objID);

        obj.closest("div.form_grp").addClass("has-danger");
        obj.closest("div.form_content").addClass("form-control-danger");

        var parent;
        if (obj.selected != undefined) {
            parent = obj.parentNode;
            parent.appendChild(span);
        } else if (obj.length != undefined && obj.length > 0 && obj[0].checked != undefined) {
            parent = obj[0].parentNode;
            parent.appendChild(span);
        } else if (obj.parentNode != undefined) {
            parent = obj.parentNode;
            parent.appendChild(span);
        } else {
            obj.wrapAll("<div class=\"form-control-feedback\">" + message + "</div>");
            //obj.after("nbsp;<font color=red>" + message + "</font>");
        }
        FormUtil.MessageQueue.push(span);
    } catch(E) {
        alert(E);
    }
    try {
        obj.focus();
    } catch(e) {}
};
FormUtil.MessageReset = function() {
    var queue = FormUtil.MessageQueue;
    for (var i = 0; i < queue.length; i++) {
        var span = queue[i];
        span.parentNode.removeChild(span);
    }
    FormUtil.MessageQueue = null;
    FormUtil.MessageQueue = new Array();
};

FormUtil.CheckBox = {};
FormUtil.CheckBox.setGroup = function(pcb, ccb) {
    if (pcb == null) {
        //alert("Checkbox.setGroup parent checkbox is null!!"); 沒資料時會顯示
        return;
    }

    pcb.onclick = function() {
        if (ccb != undefined) {
            if (ccb.length == undefined) {
                ccb.checked = this.checked;
            } else {
                for (var i = 0; i < ccb.length; i++) {
                    ccb[i].checked = this.checked;
                }
            }
        } else {
            this.checked = false;
        }
    };

    var clickEvent = function() {
        if (ccb.length == undefined) {
            pcb.checked = this.checked;
        } else {
            var state = true;
            for (var i = 0; i < ccb.length; i++) {
                if (!ccb[i].checked) {
                    state = false;
                    break;
                }
            }
            pcb.checked = state;
        }
    };

    if (ccb != undefined) {
        if (ccb.length == undefined) {
            ccb.onclick = clickEvent;
        } else {
            for (var i = 0; i < ccb.length; i++) {
                ccb[i].onclick = clickEvent;
            }
        }
    }
};
FormUtil.CheckBox.isChoose = function(ccb) {
    if (ccb == null) {
        return false;
    } else {
        if (ccb.length == undefined) {
            return ccb.checked;
        } else {
            for (var i = 0; i < ccb.length; i++) {
                if (ccb[i].checked) {
                    return true;
                }
            }
        }
    }
    return false;
};
FormUtil.CheckBox.getCheckedValueList = function(ccb) {
    if (ccb == null) {
        return "";
    } else {
        if (ccb.length == undefined) {
            return ccb.checked ? ccb.value: "";
        } else {
            var result = "";
            for (var i = 0; i < ccb.length; i++) {
                if (ccb[i].checked) {
                    result += "," + ccb[i].value;
                }
            }
            return result.length > 0 ? result.substring(1) : "";
        }
    }
};

var BoxTool = {};
//BoxTool.mode = "colorbox";
BoxTool.open = function(title, url, width, height) {
	doFinder(title, url, width, height);
  //$.colorbox({fixed:true,title:title, href:url, open:true, iframe:true, overlayClose:false, width:width+'%', height:height+'px'});
};
BoxTool.close = function() {
	 closeModal();
  //$.colorbox.close();
};
BoxTool.callback = parent;

var Util = {};
Util._parseParamsString = function(param) {
    var text = "";
    var prop;
    for (prop in param) {
        text += "&" + prop + "=" + param[prop];
    }
    return text.length > 0 ? text.substring(1) : text;
}

//檢查表單
function checkForm(id, txt, focusID) {
    var x = document.getElementById(id);
    x.parentNode.className = "form_content form-control-danger";
    var para = document.createElement("DIV");
    var t = document.createTextNode(txt);
    para.className = "form-control-feedback";
    para.id = "Err";
    para.appendChild(t);
    x.parentNode.appendChild(para);
    if (focusID == "") {
        x.focus();
    } else {
        var f = document.getElementById(focusID);
        f.focus();
    }
}


function showError(msg) {	 
	 doMask();
	 let mdiv=$("<div>").attr("id","pageMsg")
	  .append($("<span class=\"ui-icon ui-icon-alert\" style=\"float:left; margin:1em;\"></span>"))
	  .append($("<span>").html(msg)).appendTo("body");
   mdiv.dialog({
   	  classes: {"ui-error": "highlight"},
   	  title: "系統訊息",
   	  height: "auto",
      width: 400,
      minHeight:320,
      modal: true,
   	  closeOnEscape: true,
      buttons: {
        "關閉": function() {
          $( this ).dialog( "close" );
        }
      },
      close: function( event, ui ) {closeModal();$(this).remove();},
      open: function (event, ui) {
       $('.ui-dialog').css('z-index',995);
       $(".ui-dialog-titlebar-close").hide();
       $('.ui-widget-overlay').css('z-index',994);
      }
   });
}