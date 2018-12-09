$(document).ready(function(){

            //click start button
            $(document).on("click","#start",game.gamestart);

            //click answer
            $(document).on("click", ".eg", game.correct_answer);


        });

        var questions = [
        {
            question : "What was the name of Indiana Jones long lost son who appeared in the movie 'Indiana Jones and the Crystal Skull'?",
            examples : ["Short Round", "Ben Solo", "Mutt Williams", "Henry Jones"],
            answer : "Mutt Williams",
            img: "assets/images/q1.jpg"
            }, 
        {
            question : "Special Agent 'James Bond' works for which secret service agency?",
            examples : ["CDO", "BIA", "The Q", "MI6"],
            answer : "MI6",
            img: "assets/images/q2.jpg"
        }, 
        {
            question : "What did Forest Gump's mother say 'Life was like'?",
            examples : ["A lollipop", "A box of chocolates", "A handful of roses", "A bathtub full of shrimp"],
            answer : "A box of chocolates",
            img: "assets/images/q3.jpg"
        }, 
        {
            question : "What planet was Star War's 'Han Solo' born on?",
            examples : ["Naboo", "Bespin", "Yavin", "Corellia"],
            answer : "Corellia",
            img: "assets/images/q4.jpg"
        }, 
        {
            question : "What is the name of Captain Jack Sparrow's ship?",
            examples : ["The Wyndlass", "The Black Pearl", "The Maurader", "The Jolly Roger"],
            answer : "The Black Pearl",
            img: "assets/images/q5.jpg"
        }, 
        {
            question : "The 2012 comedy Ted , the voice of Ted is portrayed by this 'man of many voices'?",
            examples : ["Seth MacFarlane", "Brad Garrett", "Seth Green", "Matt Groening"],
            answer : "Seth MacFarlane",
            img: "assets/images/q6.jpg"
        }, 
        {
            question : "Who is the very 1st boxer that 'Rocky Balboa' beats in the film series 'Rocky'?",
            examples : ["Terrible Terry Bollea", "Apollo Creed", "Spider Rico", "Irish Danny Davis"],
            answer : "Spider Rico",
            img: "assets/images/q7.jpg"
        }, 
        {
            question : "In the scene, where E.T. is lured to the home of Elliot, with Reese's Pieces, in the movie 'E.T. The Extra-terrestrial', what food did film makers want to use, but were refused permission to do so.?",
            examples : ["Twizzler's Licorice", "McDonald's French Fries", "M&M's", "Doritos Tortilla Chips"],
            answer : "M&M's",
            img: "assets/images/q8.jpg"
        }, 
        {
            question : "What was Dorothy's last name in The Wizard of OZ?",
            examples : ["Doll", "Guild", "Wolf", "Gale"],
            answer : "Gale",
            img: "assets/images/q9.jpg"
        }, 
        {
            question : "Which transformer did Sam Witwicky drive and consider as his car in the 2007 Transformers movie?",
            examples : ["Jazz", "Optimus Prime", "Ratchet", "Bumblebee"],
            answer : "Bumblebee",
            img: "assets/images/q10.jpg"
        }];

        var audio_click = new Audio("assets/Click.mp3");
        var audio_time = new Audio("assets/UpperCut.mp3");

        var game = {

            time: 15,
            intervalId: null,
            q_arr: 0,
            q_wins: 0,
            q_loses: 0,
            q_timeout: 0,     

            gamestart: function() {
                audio_click.play();
                game.q_arr= 0;
                game.q_wins= 0;
                game.q_loses= 0;
                game.q_timeout= 0;

                $("#start").hide();
                game.make_question();

            }, 


            finish_restart: function(){
                clearInterval(game.intervalId);
                $(".question_sec").empty().hide();
                $(".examples_sec").empty().hide();
                $(".answer_sec").show().append("<h2>All done! Here's how you did</h2><br>");
                $(".answer_sec").append("<p>Correct answers :"+game.q_wins+"</p>");
                $(".answer_sec").append("<p>Incorrect answers :"+game.q_loses+"</p>");
                $(".answer_sec").append("<p>Unanswered :"+game.q_timeout+"</p><br>");
                $(".answer_sec").append("<button id='start' type='button' class='btn btn-light'>Start over?</button>");
               
            },

            correct_answer: function(){
                
                var user_answer = $(this).text();
                clearInterval(game.intervalId);
                $(".question_sec").empty().hide();
                $(".examples_sec").empty().hide();


                //when time is over
                if(game.time===0){
                    audio_time.play();
                    $(".answer_sec").show().append("<h2>Out of Time !</h2><p>correct answer is : "+questions[game.q_arr].answer+ " </p>");
                    $(".answer_sec").show().append("<img class = 'answer_img' src='assets/images/timeover.gif'>");
                    game.q_timeout++;
                    
                
                //answer is right
                } else if (user_answer===questions[game.q_arr].answer){
                    audio_click.play();
                    $(".answer_sec").show().append("<h2>Correct!!</h2>");
                    $(".answer_sec").show().append("<img class = 'answer_img' src='"+questions[game.q_arr].img+"'>");
                    game.q_wins++;

                //answer is wrong
                } else {
                    audio_click.play();
                    $(".answer_sec").show().append("<h2>Nope!</h2><p>correct answer is : "+questions[game.q_arr].answer+ " </p>");
                    $(".answer_sec").show().append("<img class = 'answer_img' src='assets/images/wrong.gif'>");
                    game.q_loses++;
                }

                
                game.q_arr++;
                setTimeout(game.make_question, 2* 1000);

                

            },

            make_question: function(){
                $(".question_sec").show();
                $(".examples_sec").show();
                $(".answer_sec").empty().hide();
                game.time_start();


                //when question set is over
                if(game.q_arr>9){
                    game.finish_restart();
                }




                //show question
                $(".question_sec").append("<h3>"+questions[game.q_arr].question+"</h3>");
                

                //show examples
                for(var i=0; i<questions[game.q_arr].examples.length; i++){
            
                    var test = $("<p>").addClass("eg");
                    test.append("<button type='button' class='btn btn-outline-light'>"+questions[game.q_arr].examples[i]+"</button>");
            
                $(".examples_sec").append(test);
                };  

            },




            time_start: function() { 
                game.time = 15; 
                $(".time_sec").html("<p>Time Remaining : "+game.time+" seconds </p>");
                
                game.intervalId = setInterval(game.time_count,  1000);
            },

            time_count: function(){
                game.time--;      
                $(".time_sec").html("<p>Time Remaining : "+game.time+" seconds </p>");
                if(game.time===0){
                    game.correct_answer();
                    
                } 
    
            }
        
        }