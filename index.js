var express=require('express');
var app=express();
var port=8000;

app.set('views',__dirname+'/tpl');
app.set('view engine',"jade");
app.engine('jade',require('jade').__express);

app.get('/',function(req,res){
	res.render("chat-page");
});



app.use(express.static(__dirname+'/public'));
var io=require('socket.io');
io=io.listen(app.listen(port));

io.sockets.on('connection', function(socket){
	console.log("New Client Connected");
	socket.emit('message',{message:'And finally you reached jChat! Welcome buddy...'});
	console.log("Welcome message sent to the new client");
	socket.on('send',function(data){
		io.sockets.emit('message',data);
	});
});




console.log("Server is Listening at port Number:"+port);
