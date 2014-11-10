// from [Kim Lane](http://kinlane.com/2013/10/15/securing-site-that-runs-on-github-pages-with-json-backend-in-private-repository/)

function getUrlVar(key){
	var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search); 
	return result && unescape(result[1]) || ""; 
  }

// Set the page
$ThisPage = getUrlVar('p');    
if($ThisPage==''){
	$ThisPage = "Home";
}    

// Set the oauth token
$token = getUrlVar('t');

var github = new Github({
	token: $token,
	auth: "oauth"
	});

var repo = github.getRepo('pimpin', 'gitGouv');

// Pull the JSON file for site
repo.read('master','site.json',function(err, data){            
	if(!err) {
		$Site = JSON.parse(data);

		// Build the navigation
		$.each($Site['navigation'], function($key, $value) {
			$NavigationString = '<li><a href="' + $value + '">' + $key + '</a></li>';
			$("#primaryNavItems").append($NavigationString);           
		});
		
		// Build the Page Content
		$.each($Site['pages'], function($key, $value) {
			if($key==$ThisPage){
				$("#pageBody").html($value);
				}             
		});  
	 }          
});