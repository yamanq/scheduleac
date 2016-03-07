var allowedu = {};
var clicked = false;
allowedu["ybq987@gmail.com"] = true;
allowedu["dweinger@bloomfield.org"] = true;
allowedu["ksjdragon@gmail.com"]= true;
currentcard = 0;

Meteor.subscribe('schedule');

Template.client.helpers({

	sched: function() {
		beforeslice = schedule.find({}, {sort: {timestamp: 1}, limit: 9}).fetch();
		return beforeslice.slice(1, beforeslice.length);
	},

	mostrecent: function() {
		return schedule.find({}, {sort: {timestamp: 1}, limit: 1}).fetch();
	}

});

Template.client.events({
	"click button": function() {
		pre = document.getElementById("date").value;
		document.getElementById("date").value = "";
		post = document.getElementById('post').value;
		other = document.getElementById("other").value;
		document.getElementById("other").value = "";
		Meteor.call('add_button', this, pre, post, other);
	},

	"keypress input": function(event) {
        if (event.keyCode === 13) {
            pre = document.getElementById("date").value;
			document.getElementById("date").value = "";
			post = document.getElementById('post').value;
			other = document.getElementById("other").value;
			document.getElementById("other").value = "";
			Meteor.call('add_button', this, pre, post, other);
        }
    },

	"click .pulltab": function() {
		clicked = !clicked;
		Session.set("sidebar", clicked);
		if(clicked) {
			$(".pulltab").css("border-left", "40px solid #DD655D").css("margin-left", "17%");
			$(".scale")
			.css("-webkit-transform", "translateX(117%)")
			.css("-moz-transform", "translateX(117%)")
			.css("-ms-transform", "translateX(117%)")
			.css("transform", "translateX(117%)");
			
		} else {
			$(".pulltab").css("border-left", "40px solid #FF746B").css("margin-left", "0");
			$(".scale")
			.css("-webkit-transform", "translateX(-59%)")
			.css("-moz-transform", "translateX(-59%)")
			.css("-ms-transform", "translateX(-59%)")
			.css("transform", "translateX(-59%)");
		}
	}
});

Template.day.helpers({
	pretext: function() {
		date = moment(this.pretext);
		date = date.calendar(null, {
		    sameDay: '[Today]',
		    nextDay: '[Tomorrow]',
		    nextWeek: 'dddd',
		    lastDay: '[Yesterday]',
		    lastWeek: '[Last] dddd',
		    sameElse: 'MM/DD/YYYY'
		});
		return date;
	},

	aftertext: function() {
		return this.aftertext;
	},

	other: function() {
		return this.other;
	},
	
	allowed: function() {
		if (!(Meteor.user() === undefined) && Meteor.user().services.google.email in allowedu) {
    		return true;
		} else {
			return false;
		}
	}
});

Template.day.events({
	'click .fa' : function() {
		Meteor.call('remove', this);
	},

	'click .eachDay' : function() {
		var user_id = Session.get('user_id')
		console.log(user_id);
	}
})

Template.recent.events({
	'click .fa' : function() {
		Meteor.call('remove', this);
	}
})

Template.recent.helpers({
	pretext: function() {
		date = moment(this.pretext);
		date = date.calendar(null, {
		    sameDay: '[Today]',
		    nextDay: '[Tomorrow]',
		    nextWeek: 'dddd',
		    lastDay: '[Yesterday]',
		    lastWeek: '[Last] dddd',
		    sameElse: 'MM/DD/YYYY'
		});
		return date
	},

	aftertext: function() {
		return this.aftertext;
	},
	
	other: function() {
		return this.other;
	},

	allowed: function() {
		if (!(Meteor.user() === undefined) && Meteor.user().services.google.email in allowedu) {
    		return true;
		} else {
			return false;
		}
	}
});

Template.sidebar.helpers({
	allowed: function() {
		if (!(Meteor.user() === undefined) && Meteor.user().services.google.email in allowedu) {
    		return true;
		} else {
			return false;
		}
	}
});

Template.sidebar.events({
	"focus input": function() {
		today = new Date()
		$('#date').datepicker({
		    startDate: today.toLocaleDateString(),
		    orientation: "top auto",
		    daysOfWeekDisabled: "0,6",
		    autoclose: true,
		    todayHighlight: true
		});
	}
})

/*Template.day.rendered = function() {
	$('.eachDay').each(function ( index ) {
		$('.eachDay').eq(index)
		.css("z-index", 100-index)
		.css("-webkit-transform", "scale(" + getScale(index, 0) + ")")
		.css("-moz-transform", "scale(" + getScale(index, 0) + ")")
		.css("-ms-transform", "scale(" + getScale(index, 0) + ")")
		.css("transform", "scale(" + getScale(index, 0) + ")");
	})
}

function getScale(index, start) {
	return Math.abs(index-start) * -0.2 + 1.5
}*/


Template.phone.helpers({
	phone: function() {
		return schedule.find({}, {sort: {timestamp: 1}, limit: 10}).fetch();
	}
});
