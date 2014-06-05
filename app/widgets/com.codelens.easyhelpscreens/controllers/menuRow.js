var args = arguments[0] || {};

$.menuItem.text = args.screenName;
$.menuItem.screenID = args.screenID;
if (args.href) $.menuItem.href = args.href;
if (args.id) $.menuItem.id = args.id;
//Override default colour for Support items
if (args.href) $.rowWrapper.backgroundColor = '#cfebf5';