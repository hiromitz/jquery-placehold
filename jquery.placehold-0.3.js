/************************************************************************************
** jQuery Placehold version 0.3
** (cc) Jason Garber (http://sixtwothree.org and http://www.viget.com)
** Licensed under the CC-GNU GPL (http://creativecommons.org/licenses/GPL/2.0/)
*************************************************************************************/

;(function($) {
	$.fn.placehold = function( placeholderClassName ) {
		var placeholderClassName = placeholderClassName || "placeholder",
			supported = $.fn.placehold.is_supported();
		
		return supported ? this : this.each( function() {
			var $elem = $( this ),
				placeholder_attr = $elem.attr( "placeholder" );
			
			if ( placeholder_attr ) {
				if ( !$elem.val() || $elem.val() == placeholder_attr ) {
					$elem.addClass( placeholderClassName ).val( placeholder_attr );
				}
				
				if ( $elem.attr( "type" ) == "password" ) {
					var $pwd_shiv = $( "<input />", {
						"class": $elem.attr( "class" ) + " " + placeholderClassName,
						"value": placeholder_attr
					});
					
					$pwd_shiv.bind( "focus.placehold", function() {
						$pwd_shiv.hide();
						$elem.show().focus();
					});
					
					$elem.bind( "blur.placehold", function() {
						if ( !$elem.val() ) {
							$elem.hide();
							$pwd_shiv.show();
						}
					});
					
					$elem.hide().after( $pwd_shiv );
				}
				
				$elem.bind({
					"focus.placehold": function() {
						if ( $elem.val() == placeholder_attr ) {
							$elem.removeClass( placeholderClassName ).val( "" );
						}
					},
					"blur.placehold": function() {
						if ( !$elem.val() ) {
							$elem.addClass( placeholderClassName ).val( placeholder_attr );
						}
					}
				});
				
				$elem.closest( "form" ).bind( "submit.placehold", function() {
					if ( $elem.val() == placeholder_attr ) {
						$elem.val( "" );
					}
					
					return true;
				});
			}
		});
	};
	
	$.fn.placehold.is_supported = function() {
		return "placeholder" in document.createElement( "input" );
	};	
})(jQuery);