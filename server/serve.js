var allowed = {};
allowed["ybq987@gmail.com"] = true;
allowed["dweinger@bloomfield.org"] = true;


schedule.remove({})
schedule.permit(['insert', 'update', 'remove']).never().apply();

SyncedCron.add({
	name: 'Remove Entries past today',
	schedule: function(parser) {
		return parser.recur().on('00:00:00').time();
	},
	job: function() {
		var today = new Date();

		// Remove matchng Documents
		schedule.remove({timestamp: {$lt: today}});
	}
});

SyncedCron.start();


Meteor.methods({

	add_button: function(chrome, pre, post) {
		if (Meteor.user() != undefined && Meteor.user().services.google.email in allowed) {

			madate = pre.split("/");
			date = new Date();
			date.setMonth(madate[0]);
			date.setDate(madate[1]);
			date.setFullYear(madate[2]);

			schedule.insert({
		      "pretext": date.toDateString().slice(0,date.length),
		      "aftertext": post,
		      "timestamp": date
		    });
		}
	}
})