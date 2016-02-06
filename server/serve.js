var currentpass = "test";
var allowed = {};
allowed["ybq987@gmail.com"] = true;
allowed["dweinger@bloomfield.org"] = true;


// schedule.permit(['insert', 'update', 'remove']).never().apply();

Meteor.methods({

	add_button: function(chrome, pre, post) {
		if (Meteor.user().services.google.email in allowed) {

			madate = pre.split("/");
			date = new Date();
			date.setMonth(madate[0]);
			date.setDate(madate[1]);
			date.setFullYear(madate[2]);

			schedule.insert({
		      "pretext": date.toDateString().slice(0,date.length),
		      "aftertext": post
		    });
		}
	}
})