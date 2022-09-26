jQuery( document ).ready( function ( $ ) {
    $( 'form#postal-checker' ).submit( function ( e ) {
        e.preventDefault();

        $( 'form#postal-checker button' ).html( '<div class="loader"></div>' );

        var myform = $( '#postal-checker' ).get(0);
        var fd = new FormData( myform );

        $.ajax({
            url: window.location.protocol + '//' + window.location.hostname + '/wp-content/plugins/nb-greenxs-postal-check/APICall.php',
            data: fd,
            cache: false,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function ( results ) {
                $('html, body').animate({
                    scrollTop: $( 'section[data-id="8e71ced"]' ).offset().top - 300
                }, 1000);
                $( 'form#postal-checker button' ).html( 'Check' );
                showResults( JSON.parse( results ) );
            }
        });
    });

    function showResults ( data ) {
        var html = '<div class="elementor-row api-results"><h3>Neem voor meer informatie contact met ons op</h3>',
            i = 0;

        jQuery.each( data.availability, function ( ) {
            if( i % 3 === 0  ){
                html += '</div><div class="elementor-row">';
            }

            html += '<div class="elementor-column elementor-col-33 supplier-wrapper">';
                html += '<div>';
                    html += '<h4>' + this.supplier + '</h4>';
                    html += '<p><b>Type:</b> ' + this.technology + '<br />';
                    html += '<b>Snelheid:</b> ' + this.product + '</p>';
                    html += '<a href="/contact/"><button>Contact</button></a>';
                html += '</div>';
            html += '</div>';

            i++;
        } );
        html += '</div>';

        $( '#postalCheckResults .elementor-widget-wrap' ).html( html );
    }
});
