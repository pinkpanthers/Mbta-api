      //GET API REQUEST
      const api_url_north_station = 'https://api-v3.mbta.com/predictions?filter[stop]=North+Station&filter[direction_id]=0&include=schedule';
      const api_url_south_station = 'https://api-v3.mbta.com/predictions?filter[stop]=South+Station&filter[direction_id]=0&include=schedule';
      

        // RETURN DAY OF THE WEEK STRING
        function dayOfTheWeek(){
          let d = new Date();
          let dd = d.getDay();
          let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
          return document.getElementById('tday').textContent = days[dd];
        }

         // FORMAT THE TIME
        function addZero(i) {
          if(i<10){
            i="0"+i
          }
          return i;
        }

         function formatDate(date){
          let t = date;
          let h = addZero(t.getHours());
          h = ((h +11) % 12+1);
          let min = addZero(t.getMinutes());
          let suffix = (h >=12)? 'AM' : 'PM';
          display_current_time = h + ':' + min + ' ' + suffix;
          return display_current_time;
        }

        function today(){
          let t, y, m, d;
          t = new Date();
          y = t.getFullYear();
          m = t.getMonth() +1;
          d = t.getDate();
          return document.getElementById('date').textContent= m + '-' + d + '-' +y;
        }

        function currenTime() {
          return document.getElementById('ct').textContent = 'Current Time ' + formatDate((new Date));
        }

        function startTime() {
          let today = new Date();
          let h = today.getHours();
          h = ((h +11) % 12+1);
          let m = today.getMinutes();
          let s = today.getSeconds();
          m = checkTime(m);
          s = checkTime(s);
          let suffix = (h >=12)? 'AM' : 'PM';
          document.getElementById('ct').innerHTML =
          h + ":" + m + ":" + s + ' ' + suffix;
          let t = setTimeout(startTime, 500);
        }

        function checkTime(i) {
          if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
          return i;
        }

        //get MBTA DATA
      async function getMBTA_data() {

        //GET NORTH STATION RESPONSE
        let response_north = await fetch(api_url_north_station);
        console.log(response_north);

        let northStation_data = await response_north.json();

        console.log(northStation_data);

        dayOfTheWeek();
        today();
        startTime();


        let output = '';
        for(let i =0; i < northStation_data.data.length; i++) {

        

            // DEPARTURE TIME FROM ATTRIBUTES
            let departure = formatDate(new Date(northStation_data.data[i].attributes.departure_time));
            //DESTINATION ID FROM ROUTE
            let destination = northStation_data.data[i].relationships.route.data.id;
            // TRAIN TRACK #
            let train_track_num = northStation_data.data[i].relationships.vehicle.data ? northStation_data.data[i].relationships.vehicle.data.id : 'TBD';
            let ttn = train_track_num.replace(/\D/g, "");
            // STATUS
            let stat = northStation_data.data[i].attributes.status ? northStation_data.data[i].attributes.status : 'TBD';              
        
            // OUTPUT
            output += '<div><table>' +

              '<td>' + departure + '</td>' + 
              '<td>' + destination +'</td>' + 
              '<td>' + ttn  +'</td>' + 
              '<td>' + stat +'</td>' +

            '</table></div>';


        }  

        document.getElementById('myTable').innerHTML = output;

        //SOUTH STATION
        let response_south = await fetch(api_url_south_station);
        console.log(response_south);

        let southStation_data = await response_south.json();
        console.log(southStation_data);

        for(let i =0; i < southStation_data.data.length; i++) {

                    

            // DEPARTURE TIME FROM ATTRIBUTES
            let departure = formatDate(new Date(southStation_data.data[i].attributes.departure_time));
            //DESTINATION ID FROM ROUTE
            let destination = southStation_data.data[i].relationships.route.data.id;
            // TRAIN TRACK #
            let train_track_num = southStation_data.data[i].relationships.vehicle.data ? southStation_data.data[i].relationships.vehicle.data.id : 'TBD';
            let ttn = train_track_num.replace(/\D/g, "");
            // STATUS
            let stat = southStation_data.data[i].attributes.status ? southStation_data.data[i].attributes.status : 'TBD';              

            // OUTPUT
            output += '<div><table>' +

              '<td>' + departure + '</td>' + 
              '<td>' + destination +'</td>' + 
              '<td>' + ttn  +'</td>' + 
              '<td>' + stat +'</td>' +

            '</table></div>';


            }  

            document.getElementById('myTable2').innerHTML = output;
                    
      }

      console.log('here');
      getMBTA_data();
      

    //   function autoRefresh(rate) {
    //     setTimeout("location.reload(true);", rate);
    //   }

    //   window.onload = reload(autoRefresh(60000));

    //   function reload(){
    //     var container = document.getElementById("myTable");
    //     var content = container.innerHTML;
    //     container.innerHTML= content; 

    // }