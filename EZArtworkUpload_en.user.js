// ==UserScript==
// @name         Steam Long Artwork EZ Upload
// @namespace    https://steamcommunity.com/id/chris_nbg/
// @version      1.0en
// @description  Adds a button to the artwork upload page that makes it easy to upload long artworks.
// @author       Bier
// @match        https://steamcommunity.com/sharedfiles/edititem/767/3/
// @grant        none
// ==/UserScript==

(function() {
    //2 variables which are used to trigger warnings if the user does something wrong
    var noImageBier = 0;
    var noRightsBier = 0;
    //Notification that the Script is active
    $J('.pageTitle').after('<div class="pageTitle bier_script_activated" style="text-align:right;color:#9EEF11">Bier\'s EZ Upload Script activated!</div>');
    //adds color animation css for warning messages
    $J('head').after('<style>@keyframes colorchange{0%   {background: black;}12%   {background: #962B19;}25%  {background: black;}37%  {background : #962B19;}50%  {background: black;}62%  {background: #962B19;}75%  {background: black;}87% {background: #962B19;}100% {background: #black;}}@-webkit-keyframes colorchange /* Safari and Chrome - necessary duplicate */{0%   {background: black;}25%  {background: #962B19;}37%  {background : black;}50%  {background: #962B19;}75%  {background: black;}87% {background: #962B19;}100% {background: #black;}}</style>')
    //sets the title
    $J('#title').val('Artwork by Bier');
    //changes the backgroundcolor of the visibility options
    $J('.visiblityOptionsDesc').css({ background: "#c17800",color:"#FFFFFF" });
    //adds the button for long artworks between the cancel-button and the original upload-button.
    $J('.cancelButton').after('<div class="btnv6_white_transparent btn_medium bier_upload_button" id="bier_upload_button" style="margin-right:5px"><span>Upload as Long Artwork</span></div>');

    //tells the button what to do if clicked
    $J('#bier_upload_button').click(function(){
        //if the titlefield is empty, title changes to Artwork by Bier
        if(!$J('#title').val()){
            $J('#title').val('Artwork by Bier');
        }
        //if no picture is selected, the page scrolls up to the image selection and starts blinking red for 6 seconds
        if ($('SubmitItemForm').file.value.length == 0 && true){
            $J('#file').css({ "animation": "colorchange 6s",
                            "-webkit-animation": "colorchange 6s"});
            $J('html, body').animate({
                scrollTop: $J("#PreviewImage").offset().top
            }, 400);
            //if this warning gets triggerd a second time, a alert popup will appeare
            if(noImageBier == 0){
                noImageBier = 1;
                return false;
            }
		}
        //if rights and ownership are not checked, the page scrolls to the checkbox and starts blinking red for 6 seconds
        if( !$('agree_terms').checked ){
            $J("label[for='agree_terms']").css({ "animation": "colorchange 6s",
                            "-webkit-animation": "colorchange 6s"});
            $J('html, body').animate({
                scrollTop: $J("#agree_terms").offset().top
            }, 400);
            //if this warning gets triggerd a second time, a alert popup will appeare
            if(noRightsBier == 0){
                noRightsBier = 1;
                return false;
            }
        }
        //spoofs the image dimensions so steam can show the artwork as intended
        $J('#image_width').val('1000');
        $J('#image_height').val('1');
        //uploads the artwork
        SubmitItem( false );
    });
})();
