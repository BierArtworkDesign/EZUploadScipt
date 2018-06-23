// ==UserScript==
// @name         Steam Long Artwork EZ Upload
// @namespace    https://steamcommunity.com/id/chris_nbg/
// @version      1.0de
// @description  Fügt auf der Artwork Upload Seite eine Schaltfläche hinzu, die das Hochladen vereinfacht.
// @author       Bier
// @match        https://steamcommunity.com/sharedfiles/edititem/767/3/
// @grant        none
// ==/UserScript==

(function() {
    //2 Variablen die benutzt werden um Warnungen auszugeben, falls der Benutzer etwas falsch macht
    var noImageBier = 0;
    var noRightsBier = 0;
    //Hinweis dass das Script aktiv ist
    $J('.pageTitle').after('<div class="pageTitle bier_script_activated" style="text-align:right;color:#9EEF11">Bier\'s EZ Upload Script activated!</div>');
    //Farbanimation für Warnungen
    $J('head').after('<style>@keyframes colorchange{0%   {background: black;}12%   {background: #962B19;}25%  {background: black;}37%  {background : #962B19;}50%  {background: black;}62%  {background: #962B19;}75%  {background: black;}87% {background: #962B19;}100% {background: #black;}}@-webkit-keyframes colorchange /* Safari and Chrome - necessary duplicate */{0%   {background: black;}25%  {background: #962B19;}37%  {background : black;}50%  {background: #962B19;}75%  {background: black;}87% {background: #962B19;}100% {background: #black;}}</style>')
    //Gibt automatisch einen Titel ein
    $J('#title').val('Artwork by Bier');
    //Ändert den Hintergrund der Sichtbarkeitsoptionen
    $J('.visiblityOptionsDesc').css({ background: "#c17800",color:"#FFFFFF" });
    //Fügt die besagte Schaltfläche hinzu, unten zwischen Abbrechen und Speichern 
    $J('.cancelButton').after('<div class="btnv6_white_transparent btn_medium bier_upload_button" id="bier_upload_button" style="margin-right:5px"><span>Upload as Long Artwork</span></div>');

    //Gibt an was passiert wenn auf die neue Schaltfläche geklickt wird
    $J('#bier_upload_button').click(function(){
        //Wenn das Titelfeld leer ist, wird automatisch 'Artwork by Bier' eingefügt
        if(!$J('#title').val()){
            $J('#title').val('Artwork by Bier');
        }
        //Falls kein Bild ausgewählt wurde, scrollt die Seite zum Auswahlfeld und blinkt für 6 Sekunden rot/schwarz
        if ($('SubmitItemForm').file.value.length == 0 && true){
            $J('#file').css({ "animation": "colorchange 6s",
                            "-webkit-animation": "colorchange 6s"});
            $J('html, body').animate({
                scrollTop: $J("#PreviewImage").offset().top
            }, 400);
            //Wenn diese Warnung ein zweites Mal ausgelöst wird erscheint ein PopUp
            if(noImageBier == 0){
                noImageBier = 1;
                return false;
            }
		}
        //Falls der Haken bei Berechtigungen und Eigentümerschaft nicht gesetzt wurde, scrollt die Seite zum Kasten und blinkt für 6 Sekunden rot/schwarz
        if( !$('agree_terms').checked ){
            $J("label[for='agree_terms']").css({ "animation": "colorchange 6s",
                            "-webkit-animation": "colorchange 6s"});
            $J('html, body').animate({
                scrollTop: $J("#agree_terms").offset().top
            }, 400);
            //Wenn diese Warnung ein zweites Mal ausgelöst wird erscheint ein PopUp
            if(noRightsBier == 0){
                noRightsBier = 1;
                return false;
            }
        }
        //übergibt Steam falsche Bildabmessungen, damit das Artwork richtig auf dem Profil dargestellt wird
        $J('#image_width').val('1000');
        $J('#image_height').val('1');
        //Lädt das Artwork hoch
        SubmitItem( false );
    });
})();
