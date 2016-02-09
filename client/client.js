var allowedu = {};
var clicked = false;
allowedu["ybq987@gmail.com"] = true;
allowedu["dweinger@bloomfield.org"] = true;
allowedu["ksjdragon@gmail.com"]= true;

Meteor.subscribe('schedule');

Template.client.helpers({

	sched: function() {
		beforeslice = schedule.find({}, {sort: {timestamp: 1}, limit: 5}).fetch();
		return beforeslice.slice(1, beforeslice.length);
	},

	mostrecent: function() {
		return schedule.find({}, {sort: {timestamp: 1}, limit: 1}).fetch();
	},

});

Template.client.events({
	"click button": function() {
		pre = document.getElementById("date").value;
		console.log(pre);
		document.getElementById("date").value = "";
		post = document.getElementById('post').value;
		Meteor.call('add_button', this, pre, post);
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
		    sameElse: 'DD/MM/YYYY'
		});
		return date;
	},

	aftertext: function() {
		return this.aftertext;
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
		    sameElse: 'DD/MM/YYYY'
		});
		return date
	},

	aftertext: function() {
		return this.aftertext;
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

function getScale(number) {
			
}




