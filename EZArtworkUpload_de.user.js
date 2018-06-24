// ==UserScript==
// @name         Steam Long Artwork EZ Upload
// @namespace    https://steamcommunity.com/id/chris_nbg/
// @version      1.0de
// @description  Fügt auf der Artwork Upload Seite eine Schaltfläche hinzu, die das Hochladen von langen Artworks vereinfacht. Hilft auch bei den einzelnen Schritten.
// @author       Bier
// @match        https://steamcommunity.com/sharedfiles/edititem/767/3/
// @grant        none
// ==/UserScript==

(function() {
    //2 Variablen die benutzt werden um Warnungen auszugeben, falls der Benutzer etwas falsch macht
    var noImageBier = 0;
    var noRightsBier = 0;
    //Hinweis, dass das Script aktiv ist und fügt eine Schaltfläche hinzu, um die Seite neu zu laden
    $J('.pageTitle').before('<div><div class="bier_script_activated" style="float:left;color:#9EEF11;font-size:24px;margin-top:14px">Bier\'s EZ Upload Script ist aktiviert!</div>'
                            +'<div class="btnv6_white_transparent btn_medium bier_reset_button" id="bier_reset_button" style="margin-top:8px;margin-right:7px;float:right"><span>Seite zurücksetzen</span></div></div>');
    $J('.pageTitle').attr('style','clear:left').css({"padding-top":"10px"});
    //Farbanimation für Warnungen
    $J('head').after('<style>@keyframes colorchange{0%   {background: black;}12%   {background: #e20b00;}25%  {background: black;}37%  {background : #e20b00;}50%  {background: black;}62%  {background: #e20b00;}75%  {background: black;}87%  {background: #e20b00;}100% {background: #black;}}'
                     +'@-webkit-keyframes colorchange /* Safari and Chrome - necessary duplicate */{0%   {background: black;}25%  {background: #e20b00;}37%  {background : black;}50%  {background: #e20b00;}75%  {background: black;}87% {background: #e20b00;}100% {background: #black;}}</style>');
    //Gibt automatisch einen Titel ein
    $J('#title').val('Artwork by Bier');
    //Ändert die Hintergrundfarbe der Sichtbarkeitsoptionen
    $J('.visiblityOptionsDesc').css({ background: "#c17800",color:"#FFFFFF" });
    //Fügt die besagte Schaltfläche hinzu, unten zwischen Abbrechen und Speichern
    $J('.cancelButton').after('<div class="btnv6_white_transparent btn_medium bier_upload_button" id="bier_upload_button" style="margin-right:5px"><span>Hochladen als langes Artwork</span></div>');
    //Fügt den Text "Gebe einen Title ein" hinzu, der erscheint, wenn versucht wird ein Artwork ohne Titel hochzuladen
    $J('#title').after('<label for=title id="title_marker_bier">\<-- Gebe einen Titel ein</label>');
    //Ändert die Schriftgröße, Farbe und Sichtbarkeit von "Gebe einen Titel ein"
    $J('#title_marker_bier').css({"margin-left":"15px","visibility":"hidden","color":"#e51506", "font-size":"16px","font-weight":"bold","padding":"5px", "background-color":"#1a1a1a"});
    //Fügt den Text "Wähle dein Artwork aus" hinzu, der erscheint, wenn versucht wird ein Artwork hochzuladen, ohne vorher ein Artwork ausgewählt zu haben
    $J('#file').after('<label for=file id="file_marker_bier">\<-- Wähle dein Artwork aus</label>');
    //Ändert die Schriftgröße, Farbe und Sichtbarkeit von "Wähle dein Artwork aus"
    $J('#file_marker_bier').css({"margin-left":"15px","visibility":"visible","color":"#e51506", "font-size":"16px","font-weight":"bold","padding":"5px", "background-color":"#1a1a1a"});
    //Fügt den Text "Bestätige, dieses Artwork selbst erstellt zu haben" hinzu, der erscheint, wenn versucht wird ein Artwork hochzuladen, ohne vorher den Haken bei Berechtigungen und Eigentümerschaft zu setzen
    $J("label[for='agree_terms']").attr('id','label_agree');
    $J('#label_agree').after('<label for=label_agree id="agree_marker_bier">\<-- Bestätige, dieses Artwork selbst erstellt zu haben</label>');
    //Ändert die Schriftgröße, Farbe und Sichtbarkeit von "Bestätige, dieses Artwork selbst erstellt zu haben"
    $J('#agree_marker_bier').css({"margin-left":"15px","visibility":"visible","color":"#e51506", "font-size":"16px","font-weight":"bold","padding":"5px", "background-color":"#1a1a1a"});
    //Gibt an was passiert, wenn auf die "Neu Laden" Schaltfläche gedrückt wird
    $J('#bier_reset_button').click(function(){
        //Lädt die Seite neu
        $J('html, body').animate({ scrollTop: 0});
        window.location.reload(true);
    });
    //Lädt die Seite automatisch neu, falls nötig
    if ($('SubmitItemForm').file.value.length !== 0 && true){
        $J('html, body').animate({ scrollTop: 0});
        window.location.reload(true);
    }
    //bemerkt, wenn ein Bild ausgewählt wird, und macht dann "etwas"*
    var input_file_artwork = document.getElementById("file");
    input_file_artwork.addEventListener("change", handleFiles, false);
    function handleFiles() {
        //*das ist "etwas"
        //teilt Steam die Bildabmessungen mit und zeigt eine Vorschau des Bildes an
        SetImageDimensionsForFile( 'file', 'image_width', 'image_height', 'PreviewImage' );
        //prüft, ob wirklich ein Artwork ausgewählt wurde
        if ($('SubmitItemForm').file.value.length === 0 && true){
            //Falls kein Bild ausgewählt wurde, scrollt die Seite zum Auswahlfeld
            $J('html, body').animate({ scrollTop: $J("#PreviewImage").offset().top }, 2000);
            //Falls kein Bild ausgewählt wurde, wird neben dem Auswahlfeld ein helfender Text angezeigt
            $J('#file_marker_bier').show();
        }else{
            //wurde ein Artwork ausgewählt, wird der helfende Text entfernt
            $J('#file_marker_bier').hide();
            //und die Seite scrollt nach unten
            $J('html, body').animate({ scrollTop: $J("#agree_terms").offset().top+600}, 600);
            //Falls der Haken noch nicht gesetzt wurde, wird neben dem Kasten ein helfender Text angezeigt
            if( !$('agree_terms').checked ){
                $J('#agree_marker_bier').show();
            }
        }
    }
    //bemerkt, ob der Haken bei Berechtigungen und Eigentümerschaft gesetzt wurde, und zeigt einen helfenden Text an falls nicht
    $J('#agree_terms').change(
        function(){
            //entfernt den Text wenn der Haken gesetzt wurde
            if( $('agree_terms').checked ){
                $J('#agree_marker_bier').hide();
                //und zeigt ihn an, falls nicht
            } else{
                $J('#agree_marker_bier').show();
                //scrollt zum Kasten
                $J('html, body').animate({ scrollTop: $J("#agree_terms").offset().top }, 600);
            }
        });

    //Gibt an was passiert wenn auf die "Hochladen" Schaltfläche geklickt wird
    $J('#bier_upload_button').click(function(){
        //Wenn das Titelfeld leer ist, wird automatisch 'Artwork by Bier' eingefügt
        if(!$J('#title').val()){
            $J('#title').val('Artwork by Bier');
        } else
            //Falls kein Bild ausgewählt wurde, scrollt die Seite zum Auswahlfeld und blinkt für 6 Sekunden rot/schwarz
            if ($('SubmitItemForm').file.value.length === 0 && true){
                $J('#file').css({ "animation": "colorchange 6s", "-webkit-animation": "colorchange 6s"});
                $J('html, body').animate({ scrollTop: $J("#PreviewImage").offset().top }, 600);
                //Falls kein Bild ausgewählt wurde, wird neben dem Auswahlfeld ein helfender Text angezeigt
                $J('#file_marker_bier').show();
                //Wenn diese Warnung ein zweites Mal ausgelöst wird erscheint ein helfendes PopUp
                if(noImageBier === 0){
                    noImageBier = 1;
                    return false;
                }
            } else
                //Falls der Haken bei Berechtigungen und Eigentümerschaft nicht gesetzt wurde, scrollt die Seite zum Kasten und blinkt für 6 Sekunden rot/schwarz
                if( !$('agree_terms').checked ){
                    $J("label[for='agree_terms']").css({ "animation": "colorchange 6s","-webkit-animation": "colorchange 6s"});
                    $J('html, body').animate({ scrollTop: $J("#agree_terms").offset().top }, 600);
                    //Falls der Haken noch nicht gesetzt wurde, wird neben dem Kasten ein helfender Text angezeigt
                    $J('#agree_marker_bier').show();
                    //Wenn diese Warnung ein zweites Mal ausgelöst wird erscheint ein helfendes PopUp
                    if(noRightsBier === 0){
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
