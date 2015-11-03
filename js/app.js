$(function(){		
	//jqScroll
    $('#jqscroll').jqScroll({
		heightOffset: 200, 
		persistentLoad: false,
		firstLoad: true,
		loading: loadItems
	});
});

var _JQLOADING = 0;
function loadItems(){
	if(!_JQLOADING){
		_JQLOADING = 1;
		$('#loading').show();	


		var tpl = ''
		for(var i=0; i<15; i++){
			var hex = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
			tpl+='<div class="col-xs-6 col-sm-4 col-md-3 col-lg-2 item"><div style="background-color:'+hex+'"><span>'+hex+'</span><img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="></div></div>';
		}
		$('#jqscroll').append(tpl); 


		$('#loading').hide();	
		_JQLOADING = 0;
	}
}
