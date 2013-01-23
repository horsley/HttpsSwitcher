
// Init
var autoHttpslist = typeof(localStorage.autoHttpslist)=='undefined' ? [] : JSON.parse(localStorage.autoHttpslist);
var httpFailDomains = typeof(localStorage.httpFailDomains)=='undefined' ? [] : JSON.parse(localStorage.httpFailDomains);
var requestFailDetail = typeof(localStorage.requestFailDetail)=='undefined' ? {} : JSON.parse(localStorage.requestFailDetail);

// Functions
function in_array(needle, haystack) {
	for(key in haystack) if(haystack[key]==needle) return true;
	return false;
}

//save status
function domainChange(domain, action) { // 0: remove from autoHttpslist, 1: add to autoHttpslist

	if(action == 1 && in_array(domain, autoHttpslist)) { //already exist
		return;
	} else if (action == 0 && !in_array(domain, autoHttpslist)) {
		return;
	} else if (action == 1 && !in_array(domain, autoHttpslist)) {
		autoHttpslist.push(domain);
		localStorage.autoHttpslist = JSON.stringify(autoHttpslist);
	} else if (action == 0 && in_array(domain, autoHttpslist)) {		
		autoHttpslist.splice(autoHttpslist.indexOf(domain), 1);
		localStorage.autoHttpslist = JSON.stringify(autoHttpslist);
	}	
}

//auto ssl
chrome.webRequest.onBeforeRequest.addListener(function(details) {
	var retval = {};

	var url = (new RegExp('^http://([^/@]+@)?([^/@]+)/(.*)').exec(details.url)); 
	var domain = url[2];
	
	if(in_array(domain, autoHttpslist)) retval = { redirectUrl: 'https://' + details.url.substr(7) }; // Redirect the requested domain
	
	return retval;
}, {urls:['http://*/*']}, ['blocking']);

//log fail domains
chrome.webRequest.onErrorOccurred.addListener(function(details) {
	var url = (new RegExp('^http://([^/@]+@)?([^/@]+)/(.*)').exec(details.url)); 
	var domain = url[2];

	if (!in_array(domain, httpFailDomains)) {
		httpFailDomains.push(domain);
		requestFailDetail[domain] = details.error; //log fail domain and error detail
		localStorage.httpFailDomains = JSON.stringify(httpFailDomains);
		localStorage.requestFailDetail = JSON.stringify(requestFailDetail);
	}
}, {urls:['http://*/*']});

//msg receiver for options page
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	switch(request.a) {
		case 'clearRemembered':			
			autoHttpslist = [];
			localStorage.autoHttpslist = JSON.stringify(autoHttpslist);		
			break;
		case 'clearFails':
			httpFailDomains = [];
			localStorage.httpFailDomains = JSON.stringify(httpFailDomains);
		case 'domainChange': // 0: remove from autoHttpslist, 1: add to autoHttpslist			
			domainChange(request.domain, request.action);
			break;
	}
	sendResponse({});
});

//instant switch
chrome.browserAction.onClicked.addListener(function(tab) {
	var urlSplit = tab.url.toLowerCase().match('^(https?)://([a-z0-9-.]+)/');
	if (urlSplit[1].toLowerCase() == 'http') {
		domainChange(urlSplit[2], 1);
		chrome.tabs.update(tab.id, {url:'https://'+tab.url.substr(7)});
	} else if (urlSplit[1].toLowerCase() == 'https') {
		domainChange(urlSplit[2], 0);
		chrome.tabs.update(tab.id, {url:'http://'+tab.url.substr(8)});
	}
});