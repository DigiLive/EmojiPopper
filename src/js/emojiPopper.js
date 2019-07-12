(function ($) {
    "use strict"
    $.fn.emojiPopper = function(options) {
        //Define default options and overwrite them with options when called.
        var defaults = {
            title:          "Pick an emoji...",
            storageType:    "localStorage",
            autoClose:      true,
            dismiss:        true
        };
        var settings = $.extend({}, defaults, options);

        //Private Variables
        var emojiStorage    = false;
        var poppers         = $(this);
        var popperSettings;
        var popperContent;
        
        //Private Methods
        function storageAvailable(type) {
            var storage;
            try {
                storage = window[type];
                var x = '__storage_test__';
                storage.setItem(x, x);
                storage.removeItem(x);
                return true;
            }
            catch(e) {
                return e instanceof DOMException && (
                    // everything except Firefox
                    e.code === 22 ||
                    // Firefox
                    e.code === 1014 ||
                    // test name field too, because code might not be present
                    // everything except Firefox
                    e.name === 'QuotaExceededError' ||
                    // Firefox
                    e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                    // acknowledge QuotaExceededError only if there's something already stored
                    (storage && storage.length !== 0);
            }
        }
        
        function getEmoji(force, callback) {
            var emojiStored = emojiStorage && emojiStorage.getItem("emoji");
            var force       = force || !emojiStorage;

            if (force || !emojiStored) {
                //Get emoji from server
                $.getJSON(settings.url, function(data) {
                    if (emojiStorage) {
                        //Store emoji locally
                        emojiStorage.setItem("emoji", JSON.stringify(data));
                        console.log('Emoji stored locally');
                    }
                    console.log('Remote emoji to callback');
                    return callback(data);
                }).fail(function() {
                    console.error('An error occured while getting the emoji data from remote source!');
                });
            } else {            
                console.log('Local emoji to callback');
                return callback(JSON.parse(emojiStorage.getItem("emoji")));
            }
        }
        
        function createContent(data) {
            var groupName;
            var popperId = Math.random().toString(36).substr(2, 9);
            var content             = [
                '<div class="accordion" id="' + popperId + '" data-type="emojiPopper">'
            ];
            var ariaExpandedValue   = "true";
            var show                = "show";
            
            $.each(data, function(key, value) {
                if (value.groupName != groupName) {
                    groupName = value.groupName;
                    //Add card
                    //Card Header
                    content.push('<div class="card"><div class="card-header p-0" id="group' + key + '">');
                    content.push('<button type="button" class="btn btn-link btn-block" data-toggle="collapse" data-target="#collapse' + key + '" aria-expanded="'+ ariaExpandedValue +'" aria-controls="collapse' + key + '">');
                    content.push(value.groupName);
                    content.push('</button></div>');
                    //Add Card Content
                    content.push('<div id="collapse' + key + '" class="collapse '+ show +'" aria-labelledby="group' + key + '" data-parent="#emojiPopper">');
                    content.push('<div class="card-body">');
                }
                //Add Card Body
                content.push('<span title="' + value.description + '">' + value.formatted + '</span>');
                //Close card
                if (!((key + 1) in data) || data[key + 1].groupName != groupName) {
                    content.push('</div></div></div>');
                    ariaExpandedValue = "false";
                    show = "";
                }
            });
            content.push('</div>');

            return content.join("");
        }
        
        function initializeAfterData(data){
            popperContent = createContent(data);
            console.log(popperContent);
            $(document).on("click", '[data-type="emojiPopper"] span', function(e) {
                var maxLength;
                var currentValue;
                var selectionStart;
                var selectionEnd;
                var currentLength;
                var newValue;
                var target;
                var targetIsFormField
                var popper          = $(this).closest('[data-type="emojiPopper"]');
                var targetSelector  = popper.data("targetSelector");
                var toggler         = popper.data("toggler");
                var emoji           = $(this).text();

                if (targetSelector !== "undefined") {
                    target = $(targetSelector);
                    targetIsFormField = target.is("input") || target.is("textarea");
                    
                    currentValue = targetIsFormField ? target.val() : target.text();

                    //Validate New Value
                    currentLength = Array.from(currentValue).length;
                    maxLength = Number(target.attr("maxlength"));
                    if (!isNaN(maxLength) && (maxLength < (currentLength + 1))) {
                        return false;
                    }
                    
                    //Write new Value
                    selectionStart  = target[0].selectionStart;
                    selectionEnd    = target[0].selectionEnd;
                    newValue        = currentValue.slice(0, selectionStart) + emoji + currentValue.slice(selectionEnd);
                    console.log(currentValue,' TO ',newValue);
                    if (targetIsFormField) {
                            target.val(newValue);
                    } else {
                            target.text(newValue);
                    }
                }
                
                if (settings.autoClose && (toggler !== "undefined")) {
                    toggler.popover('hide');
                }
            });
            
            //Apply popper to the collection
            poppers.popover($.extend({}, settings, {
                html:       true,
                sanitize:   false,
                content:    popperContent,
            }));
            
            poppers.on('shown.bs.popover', function () {
                var $target         = $(this);
                var popperId        = $target.attr('aria-describedby');
                var popperElement   = $('#' + popperId + ' [data-type="emojiPopper"]');
                
                $target.removeAttr('aria-describedby').attr('aria-label', settings.title);
                $(popperElement).data({
                    targetSelector: $target.data("target"),
                    toggler:        $target
                });
            })
            
            poppers.on('show.bs.popover', function () {
                var $target = $(this);
                
                $target.removeAttr('aria-describedby').attr('aria-label', settings.title);
            })
            
            if (settings.dismiss) {
                //Close popper when clicked outside, which allows only 1 popper to be open also.
                $('body').on("click", function (e) {
                    poppers.each(function () {
                        //the 'is' for buttons that trigger popups
                        //the 'has' for icons within a button that triggers a popup
                        if (
                                !$(this).is(e.target) && 
                                $(this).has(e.target).length === 0 && 
                                $(".popover").has(e.target).length === 0
                           ) {
                            $(this).popover("hide");
                        }
                    });
                });
            }
            
            return this;
        };
        
        //Public Methods
        this.initializeBefore = function() {
            if(typeof(Popper) === "undefined") {
                console.error("Dependency popper.js is not loaded!");
                return this;
            }
            if (!settings.hasOwnProperty("url")) {
                console.error("Url to emoji listing is undefined!");
                return this;
            }
            
            if (storageAvailable(settings.storageType)) {
                emojiStorage = window[settings.storageType];
            }
            
            //Get emoji from storage or external source and continu initialization
            return getEmoji(false, initializeAfterData);
        };

        this.clearStorage = function() {
            if (emojiStorage) {
                emojiStorage.removeItem("emoji");
                console.log("Storage cleared");
            }
        };

        return this.initializeBefore();
    }
})(jQuery);