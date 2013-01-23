function showRememberedList() {	
	var list = JSON.parse(localStorage.autoHttpslist);
	var listHtml = '';

	list.sort();
	if (list.length) {
		for(i in list) listHtml += '<li><div><span class="domain">'+list[i]+'</span> <a href="#" class="listDelLink" id="listDelLink'+i+'">[删除]</a></div></li>';
		listHtml = '<ul>' + listHtml + '</ul>';
		listHtml = '已记住的域名：<a href="#"  id="clearRemembered">[清空]</a>' + listHtml
		$('#status').html(listHtml);
	}
}

function showFailList() {
	var list = JSON.parse(localStorage.httpFailDomains);
	var error = JSON.parse(localStorage.requestFailDetail);

	var listHtml = '';

	list.sort();
	if (list.length) {
		for(i in list) listHtml += '<li><div><span class="domain">'+list[i]+'</span> <span style="color:FF7C00">'+error[list[i]]+'</span></div></li>';
		listHtml = '<ul>' + listHtml + '</ul>';
		listHtml = '请求失败过的域名：<a href="#" id="clearFails">[清空]</a>' + listHtml
		$('#domain_fails').html(listHtml);
	}
}

// Init
$(function () {
	showRememberedList();
	showFailList();
	$('.listDelLink').click(function(){
		chrome.extension.sendMessage({a:'domainChange', action:0, domain:$(this).siblings('span.domain')[0].textContent});
		$(this).parent().parent().remove();
	});

	$('#clearRemembered').click(function(evt){
		chrome.extension.sendMessage({a:'clearRemembered'});
		$(this).parent().html('自动切换HTTPS的域名列表为空');
	});

	$('#clearFails').click(function(){
		chrome.extension.sendMessage({a:'clearFails'});
		$(this).parent().html('请求失败过的域名：尚无记录');
	});

	$('#manual_add').click(function(){
		var input = $(this).siblings('input[name="domain"]');
		var domain = $.trim(input.val());
		if (domain.length)
			chrome.extension.sendMessage({a:'domainChange', action:1, domain:domain}, function(){
				$('input[name="domain"]').val('');
				var i = $('#status').find('ul').find('li').length;
				$('#status').find('ul').append('<li><div><span class="domain">'+domain+'</span> <a href="#" id="listDelLink'+i+'">[删除]</a></div></li>')
			});
	});
});


