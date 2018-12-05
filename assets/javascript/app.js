var time_div = $("<div>").addClass("time");
    //var question_div = $("<div>").addClass("question");
    //var examples_div = $("<div>").addClass("examples");
    
var game = {
    
        q1: {
            question : "What was the first length CGI movie?",
            examples : ["A Bug's Life", "Monsters Inc.", "Toy Story", "The Lion King"],
            answer : "Toy Story"
        }, 
        q2: {
            question : "What was the first length CGI movie?",
            examples : ["A Bug's Life", "Monsters Inc.", "Toy Story", "The Lion King"],
            answer : "Toy Story"
        }, 

    };

    var stopwatch = {

        time: 30,

        time_div: function(){

        },

        reset: function() {
        stopwatch.time = 30;
        //제이쿼리로 불러서 append 하기
        },

        start: function() {  
        var count_time = $("<div>").html("<p>Time Remaining : "+stopwatch.time+" seconds </p>");
            time_div.html(count_time);  
        intervalId = setInterval(stopwatch.count,  1000);
        },

        count: function(){
            stopwatch.time--;      
            var count_time = $("<div>").html("<p>Time Remaining : "+stopwatch.time+" seconds </p>");
            time_div.html(count_time);  
            
        }
    }   

    function game_start(){
        stopwatch.start();
        var question_sec = $("<div>").append("<p>"+game.q1.question+"</p>");
        var examples_sec = $("<div>");
        for(var i=0; i<game.q1.examples.length; i++){
            
            var test = $("<div>").addClass("eg");
                test.append("<p>"+game.q1.examples[i]+"</p>");
            
            examples_sec.append(test);
        };
        
        $(".game_area").append(time_div, question_sec, examples_sec);

        $(".eg").on("click", function(){
            if(this.){

            }
        });
        
        
        
    }

    
    
    $(document).ready(function(){

        $(".btn").on("click", function(){
            
            $(".game_area").empty();
            game_start();
        });

        



    });