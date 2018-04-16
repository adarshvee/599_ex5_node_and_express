$(function() {
  $('#filterForm').submit(function(e) {
    e.preventDefault();

    var filterQuery = "";
      $('input.form-check-input:checkbox:checked').each(function () {
        if (filterQuery.length != 0) {
          filterQuery = filterQuery + "&";
          //filterQuery.concat("&");
        }
        //filterQuery.concat("filters=").concat($(this).next('label').text());
        filterQuery = filterQuery + "filters=" + $(this).next('label').text();
      });
    var encoded = encodeURIComponent("/filterHighlights?" + filterQuery);
    window.location.replace("/filterHighlights?" + filterQuery);
    // $.get( "/filterHighlights", function( data ) {
    //     $( ".result" ).html( data );
    //   });
  });
});
