/*************************
**         Init         **
**************************/
var self = $.helpImages;
var args = arguments[0] || {};
var data = [];

// Create ImageViews for  Scrollable View
for(var i = 0, l = args.images.length; i<l; i++) {
	var payload = {
		'image' : WPATH(args.imagePath + args.images[i])
	};

	data.push(Widget.createController('viewRow',payload).getView());
}

// Add ImageViews array to ScrollableView
$.scrollableView.applyProperties({
	views:data
});

// Close screen listener
$.closeScreen.addEventListener('click', function() {
	self.close();
});

//Exports split in IOS and Android for different opening/closing anims.
exports.show = function() {
	if(OS_IOS) {
		self.open({
			modal: true,
			modalStyle: Titanium.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,
			modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE
		});
	} else {
		self.open({
			activityEnterAnimation: Ti.Android.R.anim.fade_in,
            activityExitAnimation: Ti.Android.R.anim.fade_out
		});
	}
};