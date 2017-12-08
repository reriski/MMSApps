<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <style>
      #map-canvas {
        height: 100%;
      }
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
</head>
<body>
    <div id="map-canvas"></div>
<table>
    <tr>
        <th>User_Name</th>
        <th>score</th>
        <th>team</th>
    </tr>
</table>
<script>
        var map;
        var tr;
      function initialize() {
        $.getJSON('http://api.jakarta.go.id/ruang-publik/rptra', function(json){
        for (var i = 0; i < json.data.length; i++) {
            tr = $('<tr/>');
            tr.append("<td>" + json.data[i].nama_rptra + "</td>");
            tr.append("<td>" + json.data[i].location.latitude + "</td>");
            tr.append("<td>" + json.data[i].location.longitude + "</td>");
            $('table').append(tr);
        }

        var mapCanvas = document.getElementById('map-canvas');
        var uluru = {lat: json.data[50].location.latitude, lng: json.data[50].location.longitude};

        var mapOptions = {
            zoom: 13,
            center: uluru,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{stylers: [{ visibility: 'simplified' }]},{elementType: 'labels', stylers: [{ visibility: 'off' }]}]
        };


        map = new google.maps.Map(mapCanvas,mapOptions);

        var marker = new google.maps.Marker({
          position: uluru,
          map: map,
          icon: 'placeholder.png',
        });


        });
      }

</script>
<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&key=AIzaSyA9w8ZwWiBBA6-y8xEoWqlEkvWaD52fzo4&callback=initialize" async defer></script>

</body>
</html>
