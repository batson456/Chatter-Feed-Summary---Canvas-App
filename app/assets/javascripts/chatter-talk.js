var chatterTalk;
if (!chatterTalk) {
    chatterTalk = {};
}

(function ($$) {

    "use strict";

    function onClickHandler() {
    }

    chatterTalk.init =  function(sr, button, input, userId, callback) {
        $$.byId(button).onclick=function() {
            var value = $$.byId(input).value;
            chatterTalk.post(sr, value, callback, userId);
        };
    };


    chatterTalk.post =  function(sr, message, userId, callback) {
        var url = sr.context.links.chatterFeedsUrl+"/news/"+userId+"/feed-items";
        var body = {body : {messageSegments : [{type: "Text", text: message}]}};

        $$.client.ajax(url,
            {token : sr.oauthToken,
                method: 'POST',
                async: true,
                contentType: "application/json",
                data: JSON.stringify(body),
                success : function(data) {
                    if ($$.isFunction(callback)) {
                        callback(data);
                    }
                }
            });
    };

}(Sfdc.canvas));