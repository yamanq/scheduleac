var allowed = {};
allowed["ybq987@gmail.com"] = true;
allowed["dweinger@bloomfield.org"] = true;
allowed["ksjdragon@gmail.com"] = true;

schedule.permit(['insert', 'update', 'remove']).never().apply();

// schedule.remove({});

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
			mymoment = moment(pre.replace("/", "-"), "MM-DD-YYYY").toISOString().split("T")[0];
			if (pre !== undefined && post !== undefined) {
				schedule.insert({
				      "pretext": mymoment,
				      "aftertext": post,
				      "timestamp": date
				});
			}
		}
	},
	remove: function(chrome) {
		if (Meteor.user() != undefined && Meteor.user().services.google.email in allowed) {
			schedule.remove(chrome._id);
		}
	}
})
