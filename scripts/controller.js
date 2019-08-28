

// basic functionalities
$(document).ready(function () {
  $("#btn-connect").click(function () {

    client = mqtt.connect($("#address").val())
   
    client.on("connect", function () {
      $("#status").val("connected");
      console.log("successfully connected");
    })
    subs=false;
    $("#btn-publish").click(function(){
    
      var topic= $("input[name='topic']").val();
      var payload = $("input[name='payload']").val();
      var row = "<tr><td>"+ topic +"</td><td>"+ payload+"</td><td>"+moment().format('MMMM Do YYYY, h:mm:ss a')+ "</td></tr>";
      $("#tbpublish").append(row);
      subs=true;

      client.publish(topic, payload)
    })
    
    $("#btn-subscribe").click(function(){
      var topic=$("input[name='topicSub']").val();
      var row = "<tr><td>"+ topic +"</td><td>"+moment().format('MMMM Do YYYY, h:mm:ss a')+ "</td></tr>";
      $("#tbsubscribe").append(row);
      $("#btn-publish").click(function(){
        var topic1= $("input[name='topic']").val();
        var payload = $("input[name='payload']").val();
        if(topic==topic1){
          var row = "<tr><td>"+ topic +"</td><td>"+ payload+"</td><td>"+moment().format('MMMM Do YYYY, h:mm:ss a')+ "</td></tr>";
          $("#tbbroker").append(row);
        }
        
      })

      client.subscribe("mqtt/"+topic)
      client.on("message", function (topic, payload) {
        console.log([topic, payload].join(": "));   
      })
      
    })
    
  })
})




// advance functionalities
// client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// client.subscribe("mqtt/demo", function (err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("subscribed ")
//   }
// })

// client.on("connect", function(){
//     console.log("Successfully connected");
// })

// client.on("message", function (topic, payload) {
//   console.log([topic, payload].join(": "));
//   client.end();
// })

// client.publish("mqtt/demo", "hello world!", function(err){
//   if (err){
//     console.log(err)
//   } else {
//     console.log("published")
//   }
// })
