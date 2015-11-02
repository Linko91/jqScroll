$(function(){		
	//jqScroll
    $('#stream').jqScroll({
		heightOffset: 100, 
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
			tpl+='<div>test</div>';
		}
		$('#jqScroll').append(tpl); 


		$('#loading').hide();	
		_JQLOADING = 0;
	}
}
