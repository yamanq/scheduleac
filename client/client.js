var allowedu = {};
allowedu["ybq987@gmail.com"] = true;
allowedu["dweinger@bloomfield.org"] = true;

var done = false;

Meteor.subscribe('schedule');


Template.client.helpers({

	sched: function() {
		return schedule.find({}, {sort: {timestamp: 1}, limit: 5}).fetch();
	},

	mostrecent: function() {
		return schedule.find({}, {sort: {timestamp: 1}, limit: 1}).fetch();
	},

	allowed: function() {
		if (!(Meteor.user() === undefined) && Meteor.user().services.google.email in allowedu) {
    		return true
		} else {
			return false;
		}
	} 


});

Template.client.events({
	"focus input": function() {
		if (!done) {
			today = new Date()
		    $('#date').datepicker({
		    	startDate: today.toLocaleDateString(),
		    	orientation: "top auto",
		    	daysOfWeekDisabled: "0,6",
		    	autoclose: true,
		    	todayHighlight: true
			});
			done = true;
		}
	},

	"click button": function() {
		pre = document.getElementById("date").value;
		document.getElementById("date").value = "";
		post = document.getElementById('post').value;
		Meteor.call('add_button', this, pre, post);
	}
});

Template.day.helpers({
	pretext: function() {
		return this.pretext;
	},
	aftertext: function() {
		return this.aftertext;
	}
});

Template.recent.helpers({
	pretext: function() {
		return this.pretext;
	},
	aftertext: function() {
		return this.aftertext;
	}
});