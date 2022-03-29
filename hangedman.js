'use strict';
/* 
The algorithm of the proigram:
start the hangeman function (a main function that operate the hole program)
print an elegent text(hangman) to the screen(here i used multiline string)
print another elegent text (by ...) to the screen ( here i used figlet)
Then calls the choose_word function to chose the secret word
While not run out of tries
    Present the number of tries
    Present the secret word ( the exposed letter and '*' for unexposed letters)
    Get a letter from the player
    If he types more than one letter :
        Compare with the secret word if equal
            Win notification
            End the game
        Else
            Ask him to Type one letter
    If he type on letter :
        Try to update it in the guessed letter array if succed( it will be added to the array)
            Check if the letter not in the secret word
                Decrease number of tries.
                Show hangman stage
                Increase number of satge
            Check if the holle secret word guessed
                Show the secret word
                Win notification
        Check if number of tries = 0
            Lose notification
            Show the secret word
 */
var readlineSync = require('readline-sync');
var figlet = require('figlet');
var colors = require('colors/safe');   // for running this correctly you need the colors package to be installed , you would get the game with colors else you would get error 

function open_screen() {
    /*     print an elegent welcome message
     return : none     */
    const multiLine = (str) => {
        return str;
    }
    let string = `
HHHHHHHHH     HHHHHHHHH
H:::::::H     H:::::::H
H:::::::H     H:::::::H
HH::::::H     H::::::HH
  H:::::H     H:::::H    aaaaaaaaaaaaa  nnnn  nnnnnnnn       ggggggggg   ggggg   mmmmmmm    mmmmmmm     aaaaaaaaaaaaa  nnnn  nnnnnnnn
  H:::::H     H:::::H    a::::::::::::a n:::nn::::::::nn    g:::::::::ggg::::g mm:::::::m  m:::::::mm   a::::::::::::a n:::nn::::::::nn
  H::::::HHHHH::::::H    aaaaaaaaa:::::an::::::::::::::nn  g:::::::::::::::::gm::::::::::mm::::::::::m  aaaaaaaaa:::::an::::::::::::::nn
  H:::::::::::::::::H             a::::ann:::::::::::::::ng::::::ggggg::::::ggm::::::::::::::::::::::m           a::::ann:::::::::::::::n
  H:::::::::::::::::H      aaaaaaa:::::a  n:::::nnnn:::::ng:::::g     g:::::g m:::::mmm::::::mmm:::::m    aaaaaaa:::::a  n:::::nnnn:::::n
  H::::::HHHHH::::::H    aa::::::::::::a  n::::n    n::::ng:::::g     g:::::g m::::m   m::::m   m::::m  aa::::::::::::a  n::::n    n::::n
  H:::::H     H:::::H   a::::aaaa::::::a  n::::n    n::::ng:::::g     g:::::g m::::m   m::::m   m::::m a::::aaaa::::::a  n::::n    n::::n
  H:::::H     H:::::H  a::::a    a:::::a  n::::n    n::::ng::::::g    g:::::g m::::m   m::::m   m::::ma::::a    a:::::a  n::::n    n::::n
HH::::::H     H::::::HHa::::a    a:::::a  n::::n    n::::ng:::::::ggggg:::::g m::::m   m::::m   m::::ma::::a    a:::::a  n::::n    n::::n
H:::::::H     H:::::::Ha:::::aaaa::::::a  n::::n    n::::n g::::::::::::::::g m::::m   m::::m   m::::ma:::::aaaa::::::a  n::::n    n::::n
H:::::::H     H:::::::H a::::::::::aa:::a n::::n    n::::n  gg::::::::::::::g m::::m   m::::m   m::::m a::::::::::aa:::a n::::n    n::::n
HHHHHHHHH     HHHHHHHHH  aaaaaaaaaa  aaaa nnnnnn    nnnnnn    gggggggg::::::g mmmmmm   mmmmmm   mmmmmm  aaaaaaaaaa  aaaa nnnnnn    nnnnnn
                                                                      g:::::g
                                                          gggggg      g:::::g
                                                          g:::::gg   gg:::::g
                                                           g::::::ggg:::::::g
                                                            gg:::::::::::::g
                                                              ggg::::::ggg
                                                                 gggggg

`;
    console.log(colors.red(multiLine(string)));   // this will show the open screen ( hangman word) in red color        
}
//---------------end of open_screen function ----------------------
function show_stage(stage) {
    /* this function show the stages of the game each  time the player have 
    a wrong guess it will Shows a more advanced stage toword the hang.
    param stage : the current stage that should be shown
    stage type : integer
    return : none       */
    const multiLine = (str) => {
        return str;
    }
   // the initial stage at the begining of the game - the base of the pillar
let stg =[ `_______`,

    // first stage: the virtical pillar
 `
    |
    |
    |
    |
    |\\
 ___|_\\___`,
// second stage: The upper part of the hang pillar (horizental)
`
    ________
    |/
    |
    |
    |
    |\\
 ___|_\\___`,
    // third stage: all the hang pillar
`
    _________
    |/      |
    |
    |
    |
    |\\
 ___|_\\___`,
    // fourth stage: the head
`
    _________
    |/      |
    |       0
    |
    |
    |\\
 ___|_\\___`,
    // fifth stage: head & torso
`
    _________
    |/      |
    |       0
    |       |
    |
    |\\
 ___|_\\___`,
    // sixth stage: head, torso, left arm
`
    _________
    |/      |
    |       0
    |      /|
    |
    |\\
 ___|_\\___`,
     // seventh stage: head, torso, both arms
 `
    _________
    |/      |
    |       0
    |      /|\\
    |
    |\\
 ___|_\\___`,
    // eighth stage: head, torso, both arms, and left leg
    `
    _________
    |/      |
    |       0
    |      /|\\
    |      /
    |\\
 ___|_\\___`,
    // ninth stage: head, torso, both arms, and both legs
    `
    _________
    |/      |
    |       0
    |      /|\\
    |      / \\
    |\\
 ___|_\\___`];

 // this will show the hangman stages with colors                                               
   if (stage < 3 ){
        console.log(multiLine(stg[stage]));
    }
    if(stage > 2 && stage < 6) {
        console.log(colors.yellow(multiLine(stg[stage])));     //    print the hangedman in yellow color  
        }
    if (stage >5 && stage <9){
        console.log(colors.magenta(multiLine(stg[stage])));     //    print the hangedman in yellow color 
        }
    if ( stage == 9){
        console.log(colors.red(multiLine(stg[stage])));     //    print the hangedman in yellow color        
    } 
}
//---------------end of show_stage function --------------------
function try_update_letter_guessed(letter_guessed, old_letters_guessed) {
/*  This function update the array of the guessted letters, if the returned
value from the check_valid_input function is true otherwise it will print
the guessed letters array.
: param letter_guessed: the letter that the player is trying to guess
: type letter_guessed: string(text letter)
: param old_letters_guessed: All the letters the player has guessted
: type old_letters_guessed: array
: return: true if the lettter in the word / false if not in the word
: return type: boolian   */
    if (check_valid_input(letter_guessed, old_letters_guessed)) {
        old_letters_guessed.push(letter_guessed);
        return (true);
        }
    else {
        console.log("you have already guessed :" + old_letters_guessed);
        return (false);
    }
}
//---------------end of try_update_letter_guessed function -------------------
function check_valid_input(letter_guessed, old_letters_guessed){
    /*      This function check if the input is a single English alphabet letter
      and if it wasn't guessed earlier.
    : param letter_guessed: the later that the player is trying to guess
    : type letter_guessed: string
    : param old_letters_guessed: All the letters the player has guessted
    : type old_letters_guessed: array
    : return: true / false
    : return type: boolian      */
    if (!/[^a-z]/.test(letter_guessed)) {
        if (old_letters_guessed.includes(letter_guessed)) {
            return (false);
        }
        else {
            return (true);
        }
    }
    else {
         console.log(colors.cyan("type only alphabet characters"));              // colored text message
        return (false);
    }
}
//---------------end of check_valid_input function ----------------------
function check_win(secret_word, old_letters_guessed){
    /*   This function get the word that the player need to guess and the
    letters that he guessed, the function check if all the letters in
        the secret word guessed correctly the function will return true, else
    it will return false.
    : param secret_word: the word that the player need to guess
    : type secret_word: string
    : param old_letters_guessed: the letters that the player have guessed
    : type old_letters_guessed: array
    : return: true if the player guessed the whole word, or false if he didn't
    : return type: boolian  string.charAt(4)    */

    let winner = true, i = 0;
    for (i = 0; i < secret_word.length; i++) {
        if (old_letters_guessed.includes(secret_word.charAt(i)) == false) {
            winner = false;
            return (winner);
        }
    }
    return (winner);
}
//---------------end of check_win function --------------------
function choose_word() {
/*      This function will choose a random word from a given array
:return: the word that the player should guess
:return type: string        */
    // Create an array of words
    let words = [
        "javascript","artist", "arrow", "apollo", "answer", "awesome", "anniversary","application", "approve","architect", "argue", "assist","attractive","benefit",
        "monkey","behavior", "beehive", "bee", "beside", "beuond","better", "between", "bike", "billion", "bible", "blow", "board","card", "care", "celebrate", "cell",
        "amazing","ceremony", "chain", "champion", "channel","charity", "cold", "combination", "comfort", "conflict", "development", "dialogue", "diet", "different",
        "pancake","discover", "dominant", "double", "drop", "dust", "drink", "earth", "economic", "editor", "editon", "edge", "english", "environment", "entry", "exercise",
        "expect", "eye", "fall", "fail", "failure", "forest", "focus", "feelings", "fantasy", "film", "first", "generate", "go", "giant", "gifted", "girl", "guide","between",
        "index","guess", "great", "greatest", "hair", "hand", "headline", "hello", "highlight", "him", "hope", "hero", "hold", "hot", "husband", "human", "ice", "ideal",
        "code","identify", "impact", "incentive", "income", "increase", "indian", "injury", "insurance", "irish", "italian", "job", "jersey", "justice", "juice", "seize",
        "angular","joy", "journey", "judge","key", "know", "kitchen", "kid", "knock", "knowledge", "kind", "knife", "lab", "laboratory", "lack", "leak", "laugh", "launch",
        "react","lawn", "law", "lawyer", "leader", "lead", "leadership", "leaf", "lesson", "level", "live", "life","mad", "mercy", "military", "manners", "manager","market",
        "python","meaning", "meat", "metal", "method", "middle",  "minister", "minor", "miracle", "moon", "music", "name", "nation", "native", "natural", "nature", "negative",
        "apple","news", "next", "net", "never", "new", "nice", "nobody", "nose", "nut", "observe", "obtain", "obvious", "occur", "occasion", "ocean", "odd", "olympic", "way",
        "option", "origin", "other", "oven", "owner", "painting", "paint", "palm", "panel", "paper", "passenger", "pool", "poor", "pay", "pause", "perform", "period","online",
        "planet", "player", "popular", "powder","protect", "rare", "raw", "real", "reality", "reason", "recall", "reduce", "refer", "regular", "replace", "require", "resist",
        "rice", "risk", "roll", "role", "rush", "russian", "sales", "sand", "sauce", "save", "scared", "say", "scale", "scene", "scream", "script", "season", "secret", "seek", 
        "senior", "serve", "server", "set", "setting", "seven", "shade", "sharp", "sheet", "shoot", "shut", "sight", "skill", "smoke", "tail", "tape", "target", "task","wave",
        "teenager", "telescope", "terrible", "thin", "thick", "thing", "thousand", "ticket", "tight", "tongue", "tool", "toward", "trail", "translate", "trust", "typical",
        "ultimate", "uncle", "unique", "unusual", "urban", "usual", "valley", "vehicle", "victim", "violate", "virus", "vision", "vote", "want", "wash", "waste", "water",
        "weak", "welcome", "wheel", "whisper", "white", "wild", "winter", "wish", "wonder", "wonderful", "world", "yesterday", "young", "yourself", "youth", "writer", "joke",
        "donkey", "door", "floor","flat", "fast","unit","lovely","professional","sister", "babysitter","brother", "father","fruits" ,"garage","orange","yellow","equepment"
    ];
    let word = words[Math.floor(Math.random() * words.length)];   // Pick a random word
    word.toLowerCase();
    return (word);
}
//---------------end of choose_word function --------------------
function show_hidden_word(secret_word, old_letters_guessed) {
    /*        The function return array of guessed letters and _ for non guessed
    : param secret_word: the word that the player need to guess
    : type secret_word: string
    : param old_letters_guessed: the letters that the player have guessed
    : type old_letters_guessed: array
    : return: word_display
    : rtype: string   */
    let word_display = "";
    if (old_letters_guessed == "") {
        for (let i = 0; i < secret_word.length; i++) {
            word_display += ("*");
        }
    }
    else {
        for (let i = 0; i < secret_word.length; i++) {
            if (old_letters_guessed.includes(secret_word.charAt(i))) {
                word_display += (secret_word.charAt(i));
            }
            else {
                word_display += ("*");
            }
        }
    }
    console.log(word_display);
    return(word_display);
}
//---------------end of show_hidden_word function ------------------
function letter_check(letter_guessed, secret_word) {
    /*        check if the letter within the secret word
    : param letter_guessed: the later that the player is trying to guess
    : type letter_guessed: string(text letter)
    : param secret_word: the word that the player need to guess
    : type secret_word: string
    : return: True if the letter un the word or false if its not
        : rtype: boolian    */
    if (secret_word.includes(letter_guessed)){     
         console.log(colors.green("\n Very Good \n"));
        return true;
    }
    else {
        console.log(colors.cyan("\n wrong letter , try another letter \n"));             
        return false;
    }
}
//---------------end of letter_check function ------------------
function hangman() {
    /*    This function try to guess the secret word, it will end if the player
    guess the secret word or get out of tries(10 different wrong letters)
    : return: none    */
    let MAX_TRIES = 10;              // MAX_TRIES: maximum wrong guesses that can be done , type MAX_TRIES : int
    let num_of_stage = 0;           // num_of_stage: how many time wrong letter guessed-for the stage show , type num_of_tries : int
    let old_letters_guessed = [];   // old_letters_guessed: the letters that the player have guessed , type old_letters_guessed: array
    let secret_word = "";           // secret_word: the word that the player need to guess , type secret_word: string
    let letter_guessed;             // guess a letter in the word , user input 
    let display_word;               // display the secret word as * or as letters
    let stage;                      // a variable indecate the stage of the game ( to drew the hang ).

    open_screen();
      console.log(colors.blue(figlet.textSync('by  Nasim  Daghash', { horizontalLayout: 'default'})));        // print an elegent blue color text          
    console.log ("\n try to guess the hidden word , you can guess a single letter each time or you can guess the whole word , good luck !! \n ")
    secret_word = choose_word();                                                                // chose the secret word              
    while (MAX_TRIES > 0) {                                                                        // while you have guess attempts
        console.log("\nYou have " + MAX_TRIES + " guesses");                                           
        console.log("The word is :\n")
        display_word = show_hidden_word(secret_word, old_letters_guessed);
        letter_guessed = readlineSync.question("\n enter a letter :").toLowerCase();
        if (letter_guessed.length > 1) {
            if (letter_guessed === secret_word) {
                console.log("\n The word is :", secret_word);
                console.log(colors.green(figlet.textSync('You win', { horizontalLayout: 'default' })));          // print an elegent green color text    
                MAX_TRIES = 0;
                break;
            }
            else {
                console.log(colors.cyan("Please enter only one character"));                                        //   print notification with color                                                              
            }
        }
        if (letter_guessed.length == 1) {
            if (try_update_letter_guessed(letter_guessed, old_letters_guessed)) {
                if ((letter_check(letter_guessed, secret_word)) == false) {
                    MAX_TRIES -= 1;
                    stage = num_of_stage;
                    show_stage(stage);
                    num_of_stage += 1;
                }
                else{
                if (check_win(secret_word, old_letters_guessed)) {
                    console.log("\n The word is :", secret_word);
                     console.log(colors.green(figlet.textSync('You win', { horizontalLayout: 'default' })));          // print an elegent green color text                
                    MAX_TRIES = 0;
                    break;
                    }
                }
            }
            if (MAX_TRIES == 0) {
                console.log(colors.red( "\nYou Lose\n"));                                                         // print lose notification red color      
                console.log(" The word is :", secret_word);
            }
        }
    }
}
// ------------- end of hangman function ------------------
hangman();