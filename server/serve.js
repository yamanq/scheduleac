var allowed = {};
allowed["ybq987@gmail.com"] = true;
allowed["dweinger@bloomfield.org"] = true;
//allowed["ksjdragon@gmail.com"] = true;

schedule.permit(['insert', 'update', 'remove']).never().apply();

// schedule.remove({});

SyncedCron.add({
	name: 'Remove Entries past today',
	schedule: function(parser) {
		return parser.recur().on('00:00:00').time();
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
			thepretext = mymoment.toISOString().split("T")[0];
			time = mymoment.format("X");
			previous = schedule.find({"pretext": thepretext}).fetch();
			if (previous.length > 0) {
				entry = previous[0]
				schedule.update(entry._id, {"aftertext": post, "pretext": entry.pretext, "timestamp": entry.timestamp});
			} else {
				schedule.insert({
			      "pretext": thepretext,
			      "aftertext": post,
			      "timestamp": time
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
