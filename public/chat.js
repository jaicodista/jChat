window.onload=function(){
	var messages=[];
	var socket=io.connect('http://localhost:8000');

	var content=document.getElementById("content");	
	var field=document.getElementById("field");
	var sendButton=document.getElementById("send");
	var name=prompt("Please type in your name to continue!");

	socket.on('message', function(data){

		if(data)
		{
			messages.push(data);
			var html='';	
			for(var i=0;i<messages.length;i++)
			{
				
	
				html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
				html += (messages[i].message ?messages[i].message:'Joined to jChat just Now!')   + '<br />';		
			}
			content.innerHTML=html;
		}
		else
		{
			console.log("there is problem in the data!.",data);
		}
	});
	sendButton.onclick=function(){
		var text=field.value;
		 if(name== "" || name=="Server") 
		{
	           alert("Please Restart the application and Enter your name when asked!"); 
	        } 
		else {
 	           var text = field.value;
 	           socket.emit('send', { message:text, username:name });
			field.value='';
 	       }
    	}
}
