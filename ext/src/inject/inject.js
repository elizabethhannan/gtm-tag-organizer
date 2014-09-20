chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

		// load jquery
		// var jq = document.createElement('script');
		// jq.src = "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
		// document.getElementsByTagName('head')[0].appendChild(jq);

		var gtmTableUpdate = function(){
				

			// parse and append tag
			jQuery('div#ID-tagTable div.ID-table tbody tr.CT_TABLE_ROW').each(function(){
				var tag = jQuery(this).find('td.CT_TABLE_CELL>div.ACTION-clickTag').text().split("-");
				
				// tag[0] = (tag.length > 1) ? tag[0] : "Other";

				//append tag to parent
				if(tag.length > 1){
					jQuery(this).attr('tagGroup', tag[0]);
					// console.log(jQuery(this).parents('tr'));	
				}
				
			});



			var prevAttr = "";
				jQuery('div#ID-tagTable div.ID-table tbody tr.CT_TABLE_ROW').each(function() {
				var curAttr = jQuery(this).attr('tagGroup');
				
				if(curAttr != undefined && curAttr != prevAttr){
					jQuery(this).before('<tr class="toggle" id="'+curAttr+'"><td>'+curAttr+'</td><td></td><td></td><td></td></tr>');
					prevAttr = curAttr;
				}
			  
			});

			// Toggle Rows
			jQuery('.toggle').click(function(){
			var id = jQuery(this).attr('id');
			jQuery('tr[tagGroup="'+id+'"]').toggle();
			});

			jQuery('tr[taggroup]').toggle();
		}

		var tableRedraw = function(){
		jQuery('div.ID-table table.CT_TABLE tbody th').click(function(){
			setTimeout(function(){
			gtmTableUpdate(); tableRedraw();
			// console.log("code run");
			}, 500);
		});
		}

		tableRedraw();
		gtmTableUpdate();
		// MY CUSTOM SCRIPT

	}
	}, 10);
});

