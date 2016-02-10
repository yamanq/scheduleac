var allowed = {};
allowed["ybq987@gmail.com"] = true;
allowed["dweinger@bloomfield.org"] = true;
allowed["ksjdragon@gmail.com"] = true;

schedule.permit(['insert', 'update', 'remove']).never().apply();

// schedule.remove({});

SyncedCron.add({
	name: 'Remove Entries past today',
	schedule: function(parser) {
		return parser.recur().on('07:46:00').time();
	},
	job: function() {
		var today = moment().format("X");

		// Remove matchng Documents
		schedule.remove({timestamp: {$lt: today}});
	}
});

SyncedCron.start();


Meteor.methods({

	add_button: function(chrome, pre, post) {
		if ((Meteor.user() != undefined) && (Meteor.user().services.google.email in allowed) && !(pre === "")) {
			mymoment = moment(pre.replace("/", "-"), "MM-DD-YYYY");
			schedule.insert({
			      "pretext": mymoment.toISOString().split("T")[0],
			      "aftertext": post,
			      "timestamp": mymoment.format("X")
			});
		}
	},
	remove: function(chrome) {
		if (Meteor.user() != undefined && Meteor.user().services.google.email in allowed) {
			schedule.remove(chrome._id);
		}
	}
})
