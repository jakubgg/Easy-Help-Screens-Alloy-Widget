/*************************
**         Init         **
**************************/
/* global WPATH: true, Widget: false */
'use strict';
var lib = require(WPATH('screens'));


/*************************
**      Build Menu      **
**************************/

$.helpMenu = {
	defaults : {
		// Check for the platform and set help environment accordingly
		osName : Ti.Platform.getOsname(),
		screens : {},
		platform : {},
		scene : $.scrollView
	},
	/**
	 * Initialise and create help menu, attach listeners
	 * @method init
	 * @return {void}
	 */
	init : function() {
		var d = this.defaults;
		switch(d.osName){
			case 'android' :
				d.screens = lib.helpScreens.android;
				d.platform = lib.helpScreens.android.support;
			break;
			case 'iphone':
		    	d.screens = lib.helpScreens.ios.iphone;
		    	d.platform = lib.helpScreens.ios.support;
			break;
		    case 'ipad' :
		    	d.screens = lib.helpScreens.ios.ipad;
		    	d.platform = lib.helpScreens.ios.support;
			break;
			default:
				d.screens = lib.helpScreens.ios.iphone;
				d.platform = lib.helpScreens.ios.support;
			break;
		}

		this._createHelpItems();
		this._createSupportItems();
		this._addListeners();
	},
	/**
	 * Create labels for help items (that will show help images), and add them to the scene
	 * @method _createHelpItems
	 * @return {void}
	 */
	_createHelpItems : function() {
		var d = this.defaults;

		// Create Help Menu Items based on platform and screens.js
		for(var i = 0, l = d.screens.items.length; i<l; i++) {

			var payload = this._preparePayload(i, d.screens.items[i].screenName);

			this._createController('menuRow', payload);
		}

	},
	/**
	 * Create labels for support items (website link, email address), and add them to the scene
	 * @method _createSupportItems
	 * @return {void}
	 */
	_createSupportItems : function() {
		var d = this.defaults;
		var payload = {};
		// Create 'Website' label
		if (d.platform.website !== null) {
			payload = this._preparePayload(99999, 'Support Website', 'website', d.platform.website);
			this._createController('menuRow', payload);
		}

		// Create 'Email' label
		if (d.platform.email !== null) {
			payload = this._preparePayload(88888, 'Send email to support', 'email', d.platform.email);
			this._createController('menuRow', payload);
		}

	},
	/**
	 * Prepare payload for Widget.createCOntroller
	 * @method _preparePayload
	 * @param  {int} screenID - id that will be used to retreive a section from screens.js, or 99999 for 'website' link, 88888 for 'email'
	 * @param  {string} screenName - Name that will be shown on the Label
	 * @param  {string?} id - Optional. Id to replace automatically generated id attribute.
	 * @param  {string?} link - href link, or email address used for web site link and support email.
	 * @return {Object} payload - prepared payload as object literal.
	 */
	_preparePayload : function(screenID, screenName, id, link ) {
		id = id || null;
		link = link || null;

		var payload = {
			'id' : id,
			'screenID' : screenID,
			'screenName' : screenName,
			'href' : link
		};

		return payload;
	},
	/**
	 * Create Widget controller (used for creating labels/rows on help screen)
	 * @method _createController
	 * @param  {string} controller - controller name to create.
	 * @param  {Object} payload - information that will be passed to the controller.
	 * @return {void}
	 */
	_createController: function(controller, payload) {
		var view = Widget.createController(controller,payload).getView();
		this.defaults.scene.add(view);
		view = null;
	},
	/**
	 * Flashes touched item/button for visual feedback
	 * @param  {Object} e - 'Click' event target
	 * @return {void}
	 */
	_animateItem : function(e) {
		var d = this.defaults;
		d.scene.children.forEach(function(el){
			if (el.children[0].screenID == e.source.screenID){
				el.animate({
		            backgroundColor: '#fff',
		            duration: 250,
		            autoreverse: true
	        	});
			}
		});
	},
	/**
	 * If screen was clicked, check for necessary info to open Help for clicked item
	 * @method _openItem
	 * @param  {Object} e - 'Click' event target
	 * @return {void}
	 */
	_openItem : function(e) {
		var d = this.defaults;

		if (e.source.id === 'menuItem') {
			this._animateItem(e);
			var payload = {
				'images' : d.screens.items[e.source.screenID].images,
				'screenName' : e.source.text,
				'imagePath' : d.screens.imagePath
			};

			Widget.createController('helpImages', payload).show();
		} else if (e.source.id === 'website') {
			this._animateItem(e);
			Ti.Platform.openURL(e.source.href);

		} else if (e.source.id === 'email') {
			this._animateItem(e);
			this._bringEmailDialog();

		}

	},
	/**
	 * Shows email sending dialog after clicking 'Email' support item
	 * @method _bringEmailDialog
	 * @return {void}
	 */
	_bringEmailDialog : function() {
		var d = this.defaults;
		var emailDialog = Ti.UI.createEmailDialog();
		if (emailDialog.isSupported() === true) {
    		emailDialog.subject = 'Help...';
    		emailDialog.toRecipients = [d.platform.email];
    		emailDialog.messageBody = d.platform.messageBody || 'Type your message here...';
    		emailDialog.open();
		}else {
		    Ti.UI.createAlertDialog({ message: 'Please configure your email app first.' }).show();
		}
	},
	/**
	 * Release helpMenu resources
	 * @method releaseMenu
	 * @return {void}
	 */
	releaseMenu : function() {
		this._removeListeners();
		$.helpMenu = null;
	},
	/**
	 * Needed to create Listener callback reference
	 * @return {void}
	 */
	_clickHandler : function() {},
	/**
	 * Attach all necessary listeners
	 * @method _addListeners
	 * @return {void}
	 */
	_addListeners : function() {
		var _this = this;
		var scene = this.defaults.scene;
		// Attach 'Click' listener to the screen
		this._clickHandler = function(e) {
			_this._openItem(e);
		};
		scene.addEventListener('click', this._clickHandler);
	},
	/**
	 * Remove all attached listeners
	 * @method _removeListeners
	 * @return {void}
	 */
	_removeListeners : function() {
		this.defaults.scene.removeEventListener('click', this._clickHandler);
	}
};


$.helpMenu.init();