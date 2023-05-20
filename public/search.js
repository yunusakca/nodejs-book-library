var searchParam = document.getElementById('searchParams')
var searchParamsForm = document.getElementById('searchParamsForm')


$( "#searchParams" ).on( "keyup", function() {
    var params = searchParam.value
    searchParamsForm.action = `/search/${params}`
  } );