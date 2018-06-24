// ==UserScript==
// @name         Bier's EZ Long Artwork Upload Script
// @namespace    https://steamcommunity.com/id/chris_nbg/
// @version      1.0en
// @description  Adds a button to the artwork upload page that makes it easy to upload long artworks. Also helps at all steps.
// @author       Bier
// @match        https://steamcommunity.com/sharedfiles/edititem/767/3/
// @grant        none
// ==/UserScript==

(function() {
    //2 variables which are used to trigger warnings if the user does something wrong
    var noImageBier = 0;
    var noRightsBier = 0;
    //Notification that the Script is active and adds a button to reload the site
    $J('.pageTitle').before('<div><div class="bier_script_activated" style="float:left;color:#9EEF11;font-size:24px;margin-top:14px">Bier\'s EZ Upload Script ist aktiviert!</div>'
                            +'<div class="btnv6_white_transparent btn_medium bier_reset_button" id="bier_reset_button" style="margin-top:8px;margin-right:7px;float:right"><span>Seite zurücksetzen</span></div></div>');
    $J('.pageTitle').attr('style','clear:left').css({"padding-top":"10px"});
    //adds color animation css for warning messages
    $J('head').after('<style>@keyframes colorchange{0%   {background: black;}12%   {background: #962B19;}25%  {background: black;}37%  {background : #962B19;}50%  {background: black;}62%  {background: #962B19;}75%  {background: black;}87% {background: #962B19;}100% {background: #black;}}'
                     +'@-webkit-keyframes colorchange /* Safari and Chrome - necessary duplicate */{0%   {background: black;}25%  {background: #962B19;}37%  {background : black;}50%  {background: #962B19;}75%  {background: black;}87% {background: #962B19;}100% {background: #black;}}</style>')
    //sets the title
    $J('#title').val('Artwork by Bier');
    //changes the backgroundcolor of the visibility options
    $J('.visiblityOptionsDesc').css({ background: "#c17800",color:"#FFFFFF" });
    //adds the upload button for long artworks between the cancel-button and the original upload-button.
    $J('.cancelButton').after('<div class="btnv6_white_transparent btn_medium bier_upload_button" id="bier_upload_button" style="margin-right:5px"><span>Upload as Long Artwork</span></div>');
    //adds the helper text "Give your artwork a title"
    $J('#title').after('<label for=title id="title_marker_bier">\<-- Give your artwork a title</label>');
    //changes font-size, color and visibility of "Give your artwork a title"
    $J('#title_marker_bier').css({"margin-left":"15px","visibility":"hidden","color":"#e51506", "font-size":"16px","font-weight":"bold","padding":"5px", "background-color":"#1a1a1a"});
    //adds the helper text "Select your artwork file"
    $J('#file').after('<label for=file id="file_marker_bier">\<-- Select your artwork file</label>');
    //changes font-size, color and visibility of "Select your artwork file"
    $J('#file_marker_bier').css({"margin-left":"15px","visibility":"visible","color":"#e51506", "font-size":"16px","font-weight":"bold","padding":"5px", "background-color":"#1a1a1a"});
    //adds the helper text "Certify that you created this artwork"
    $J("label[for='agree_terms']").attr('id','label_agree');
    $J('#label_agree').after('<label for=label_agree id="agree_marker_bier">\<-- Certify that you created this artwork</label>');
    //changes font-size, color and visibility of "Certify that you created this artwork"
    $J('#agree_marker_bier').css({"margin-left":"15px","visibility":"visible","color":"#e51506", "font-size":"16px","font-weight":"bold","padding":"5px", "background-color":"#1a1a1a"});
    //tells the reload button what to do when clicked
    $J('#bier_reset_button').click(function(){
        //reloads the page
        $J('html, body').animate({ scrollTop: 0});
        window.location.reload(true);
    });
    //reloads the site if necessary
    if ($('SubmitItemForm').file.value.length !== 0 && true){
        $J('html, body').animate({ scrollTop: 0});
        window.location.reload(true);
    }
    //notices if an artwork was selected and then does "something"*
    var input_file_artwork = document.getElementById("file");
    input_file_artwork.addEventListener("change", handleFiles, false);
    function handleFiles() {
        //*this is "something"
        //tells Steam the image dimensions and shows a preview
        SetImageDimensionsForFile( 'file', 'image_width', 'image_height', 'PreviewImage' );
        //checks if an artwork is selected
        if ($('SubmitItemForm').file.value.length === 0 && true){
            //if no artwork is selected, scrolls to the artwork selection field
            $J('html, body').animate({ scrollTop: $J("#PreviewImage").offset().top }, 2000);
            //if no artwork is selected, a helping text is shown next to the artwork selection field
            $J('#file_marker_bier').show();
        }else{
            //if an artwork is selected, hide the helping text
            $J('#file_marker_bier').hide();
            //and the page scrolls down to the next step
            $J('html, body').animate({ scrollTop: $J("#agree_terms").offset().top+600}, 600);
            //if the checkbox is not checked, a helping text is shown next to the checkbox
            if( !$('agree_terms').checked ){
                $J('#agree_marker_bier').show();
            }
        }
    }
    //checks if the checkbox is checked
    $J('#agree_terms').change(
        function(){
            //hides the helping text if it is
            if( $('agree_terms').checked ){
                $J('#agree_marker_bier').hide();
                //and shows the helping text if it is not
            } else{
                $J('#agree_marker_bier').show();
                //scrolls to the checkbox
                $J('html, body').animate({ scrollTop: $J("#agree_terms").offset().top }, 600);
            }
        });

    //tells the button what to do if clicked
    $J('#bier_upload_button').click(function(){
        //if the titlefield is empty, title changes to Artwork by Bier
        if(!$J('#title').val()){
            $J('#title').val('Artwork by Bier');
        } else
            //if no picture is selected, the page scrolls up to the image selection and starts blinking red for 6 seconds
            if ($('SubmitItemForm').file.value.length === 0 && true){
                $J('#file').css({ "animation": "colorchange 6s","-webkit-animation": "colorchange 6s"});
                $J('html, body').animate({ scrollTop: $J("#PreviewImage").offset().top }, 600);
                //if no artwork is selected, a helping text is shown next to the artwork selection field
                $J('#file_marker_bier').show();
                //if this warning gets triggerd a second time, a alert popup will appeare
                if(noImageBier === 0){
                    noImageBier = 1;
                    return false;
                }
            } else
                //if rights and ownership are not checked, the page scrolls to the checkbox and starts blinking red for 6 seconds
                if( !$('agree_terms').checked ){
                    $J("label[for='agree_terms']").css({ "animation": "colorchange 6s","-webkit-animation": "colorchange 6s"});
                    $J('html, body').animate({scrollTop: $J("#agree_terms").offset().top}, 600);
                    //if the checkbox is not checked, a helping text is shown next to the checkbox
                    $J('#agree_marker_bier').show();
                    //if this warning gets triggerd a second time, a alert popup will appeare
                    if(noRightsBier === 0){
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
